class RepositoriesController < ApplicationController
  include ApplicationHelper
  include OperateProjectAbilityAble

  before_action :require_login, only: %i[edit update create_file update_file delete_file sync_mirror]
  before_action :load_repository
  before_action :authorizate!, except: [:sync_mirror, :tags, :commit]
  before_action :authorizate_user_can_edit_repo!, only: %i[sync_mirror]
  before_action :get_ref, only: %i[entries sub_entries top_counts]
  before_action :get_latest_commit, only: %i[entries sub_entries top_counts]
  before_action :get_statistics, only: %i[top_counts]

  def show
    @user = current_user
    @repo = @project.repository
    @result = @project.forge? ? Gitea::Repository::GetService.new(@owner, @project.identifier).call : nil
    @project_fork_id = @project.try(:forked_from_project_id)
    if @project_fork_id.present?
      @fork_project = Project.find_by(id: @project_fork_id)
      @fork_project_user = @fork_project.owner
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def entries
    @project.increment!(:visits)

    if @project.educoder?
      @entries = Educoder::Repository::Entries::ListService.call(@project&.project_educoder.repo_name)
    else
      @entries = Gitea::Repository::Entries::ListService.new(@owner, @project.identifier, ref: @ref).call
      @entries = @entries.present? ? @entries.sort_by{ |hash| hash['type'] } : []
      @path = Gitea.gitea_config[:domain]+"/#{@project.owner.login}/#{@project.identifier}/raw/branch/#{@ref}/"
    end
  end

  def top_counts
    @result = @project.educoder? ? nil : Gitea::Repository::GetService.new(@project.owner, @project.identifier).call
  end

  def sub_entries
    file_path_uri = URI.parse(URI.encode(params[:filepath].to_s.strip))

    if @project.educoder?
      if params[:type] === 'file'
        @sub_entries = Educoder::Repository::Entries::GetService.call(@project&.project_educoder&.repo_name, file_path_uri)
        logger.info "######### sub_entries: #{@sub_entries}"
        return render_error('该文件暂未开放，敬请期待.') if @sub_entries['status'].to_i === -1

        tmp_entries = [{
            "content" =>  @sub_entries['data']['content'],
            "type"    => "blob"
          }]
        @sub_entries = {
          "trees"=>tmp_entries,
          "commits" => [{}]
        }
      else
        @sub_entries = Educoder::Repository::Entries::ListService.call(@project&.project_educoder&.repo_name, {path: file_path_uri})
      end
    else
      interactor = Repositories::EntriesInteractor.call(@owner, @project.identifier, file_path_uri, ref: @ref)
      if interactor.success?
        result = interactor.result
        @sub_entries = result.is_a?(Array) ? result.sort_by{ |hash| hash['type'] } : result
      else
        render_error(interactor.error)
      end
    end
  end

  def commits
    @hash_commit = Gitea::Repository::Commits::ListService.new(@owner.login, @project.identifier,
      sha: params[:sha], page: params[:page], limit: params[:limit], token: current_user&.gitea_token).call
  end

  def commit
    @sha         = params[:sha]
    @commit      = Gitea::Repository::Commits::GetService.call(@owner.login, @repository.identifier, @sha, current_user&.gitea_token)
    @commit_diff = Gitea::Repository::Commits::GetService.call(@owner.login, @repository.identifier, @sha, current_user&.gitea_token, {diff: true})
  end

  def tags
    @tags = Gitea::Repository::Tags::ListService.call(current_user&.gitea_token, @owner.login, @project.identifier, {page: params[:page], limit: params[:limit]})
  end

  def edit
  end

  def create_file
    interactor = Gitea::CreateFileInteractor.call(current_user.gitea_token, @owner.login, content_params)
    if interactor.success?
      @file = interactor.result
      # create_new_pr(params)
    else
      render_error(interactor.error)
    end
  end

  def update_file
    interactor = Gitea::UpdateFileInteractor.call(current_user.gitea_token, @owner.login, params.merge(identifier: @project.identifier))
    if interactor.success?
      @file = interactor.result
      # TODO: 是否创建pr
      # create_new_pr(params)
      render_result(1, "更新成功")
    else
      render_error(interactor.error)
    end
  end

  def delete_file
    interactor = Gitea::DeleteFileInteractor.call(current_user.gitea_token, @owner.login, params.merge(identifier: @project.identifier))
    if interactor.success?
      @file = interactor.result
      render_result(1, "文件删除成功")
    else
      render_error(interactor.error)
    end
  end

  def repo_hook

  end

  def sync_mirror
    return render_error("正在镜像中..") if  @repository.mirror.waiting?

    @repository.sync_mirror!
    SyncMirroredRepositoryJob.perform_later(@repository.id, current_user.id)
    render_ok
  end

  private

  def find_project
    @project = Project.find params[:id]
    render_not_found("未找到相关的仓库") unless @project
  end

  def find_project_with_includes
    @project = Project.includes(:repository, :owner, :watchers, :praise_treads).find params[:id]
  end

  def authorizate!
    return if current_user && current_user.admin?
    if @project.repository.hidden? && !@project.member?(current_user)
      render_forbidden
    end
  end

  # TODO 获取最新commit信息
  def project_commits
    Gitea::Repository::Commits::ListService.new(@project.owner.login, @project.identifier,
      sha: get_ref, page: 1, limit: 1, token: current_user&.gitea_token).call
  end

  def get_statistics
    @branches_count = @project.educoder? ? 0 : Gitea::Repository::Branches::ListService.new(@project.owner, @project.identifier).call&.size
    @tags_count = @project.educoder? ? 0 : Gitea::Repository::Tags::ListService.new(current_user&.gitea_token, @project.owner.login, @project.identifier).call&.size
  end

  def get_ref
    @ref = params[:ref] || "master"
  end

  def get_latest_commit
    latest_commit = @project.educoder? ? nil : project_commits
    @latest_commit = latest_commit.present? ? latest_commit[:body][0] : nil
    @commits_count = latest_commit.present? ? latest_commit[:total_count] : 0
  end

  def content_params
    {
      filepath: params[:filepath],
      branch: params[:branch],
      new_branch: params[:new_branch],
      content: params[:content],
      message: params[:message],
      committer: {
        email: current_user.mail,
        name: current_user.login
      },
      identifier: @project.identifier
    }
  end

  def hook_params(hook_type, params)
    # if hook_type == "push"
    #   # TODO hook返回的记录中，暂时没有文件代码数量的增减，暂时根据 commits数量来计算
    #   uploadPushInfo = {
    #     "sha": params["commits"].present? ? params["commits"].last : "",
    #     "branch": params["ref"].to_s.split("/").last,
    #     "modification_lines": params["commits"].length
    #     }
    # elsif hook_type == "pull_request" && params["action"].to_s == "closed"  #合并请求合并后才会有上链操作
    #   uploadPushInfo = {
    #     "branch": params["base"]["ref"].to_s.split("/").last,
    #     "sha": params["pull_request"]["merge_base"],
    #     "modification_lines": 1  #pull_request中没有commits数量
    #     }
    # else
    #     uploadPushInfo = {}
    # end

    # uploadPushInfo
  end

  def create_new_pr(params)
    if params[:new_branch].present? && params[:new_branch] != params[:branch]
      local_params = {
        title: params[:message],  #标题
        body:	params[:content],  #内容
        head: params[:new_branch],  #源分支
        base: params[:branch],  #目标分支
        milestone: 0  #里程碑,未与本地的里程碑关联

      }
      requests_params = local_params.merge({
                                             assignee: current_user.try(:login),
                                             assignees: [],
                                             labels: [],
                                             due_date: Time.now
                                           })

      issue_params = {
        author_id: current_user.id,
        project_id: @project.id,
        subject: params[:message],
        description: params[:content],
        assigned_to_id: nil,
        fixed_version_id: nil,
        issue_tags_value: nil,
        issue_classify: "pull_request",
        issue_type: "1",
        tracker_id: 2,
        status_id: 1,
        priority_id: params[:priority_id] || "2"
      }
      @pull_issue = Issue.new(issue_params)
      if @pull_issue.save!
        local_requests = PullRequest.new(local_params.merge(user_id: current_user.try(:id), project_id: @project.id, issue_id: @pull_issue.id))
        if local_requests.save
          gitea_request = Gitea::PullRequest::CreateService.new(current_user.try(:gitea_token), @owner.login, @project.try(:identifier), requests_params).call
          if gitea_request[:status] == :success && local_requests.update_attributes(gpid: gitea_request["body"]["number"])
            local_requests.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "create")
          end
        end
      end
    end
  end

end
