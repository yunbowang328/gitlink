class RepositoriesController < ApplicationController
  include ApplicationHelper
  before_action :require_login, only: %i[edit update create_file update_file delete_file]
  before_action :find_project, :authorizate!

  def show
    @branches_count = Gitea::Repository::BranchesService.new(@project.owner, @project.identifier).call&.size
    @commits_count = Gitea::Repository::Commits::ListService.new(@project.owner, @project.identifier).call[:total_count]
    @result = Gitea::Repository::GetService.new(@project.owner, @project.identifier).call
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

    @ref = params[:branch] || "master"
    @entries = Gitea::Repository::Entries::ListService.new(@project.owner, @project.identifier, ref: @ref).call
    @entries = @entries.sort_by{ |hash| hash['type'] }
  end

  def sub_entries
    file_path_uri = URI.parse(URI.encode(params[:filepath].to_s.strip))
    interactor = Repositories::EntriesInteractor.call(@project.owner, @project.identifier, file_path_uri, ref: params[:ref])
    if interactor.success?
      @sub_entries = interactor.result
      @sub_entries = [] << @sub_entries unless @sub_entries.is_a? Array
      @sub_entries = @sub_entries.sort_by{ |hash| hash['type'] }
    else
      render_error(interactor.error)
    end
  end

  def commits
    @hash_commit = Gitea::Repository::Commits::ListService.new(@project.owner, @project.identifier, sha: params[:sha], page: params[:page]).call
    Rails.logger.info("######__________________#####{@hash_commit}")
    @hash_commit
  end

  def single_commit
    @commit = Gitea::Repository::Commits::GetService.new(@project.owner, @project.identifier, params[:sha]).call
  end

  def tags
    @tags = Gitea::Repository::Tags::ListService.new(@project, @project.identifier).call
  end

  def edit
  end

  def create_file
    interactor = Gitea::CreateFileInteractor.call(current_user, content_params)
    if interactor.success?
      @file = interactor.result
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
          priority_id: 1
        }
        pull_issue = Issue.new(issue_params)
        if pull_issue.save!
          local_requests = PullRequest.new(local_params.merge(user_id: current_user.try(:id), project_id: @project.id, issue_id: pull_issue.id))
          if local_requests.save
            gitea_request = Gitea::PullRequest::CreateService.new(current_user.try(:gitea_token), @project.owner, @project.try(:identifier), requests_params).call
            if gitea_request && local_requests.update_attributes(gpid: gitea_request["number"])
              local_requests.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "create")
            end
          end
        end
      end

    else
      render_error(interactor.error)
    end
  end

  def update_file
    interactor = Gitea::UpdateFileInteractor.call(current_user, params.merge(identifier: @project.identifier))
    if interactor.success?
      @file = interactor.result
      render_result(1, "更新成功")
    else
      render_error(interactor.error)
    end
  end

  def delete_file
    interactor = Gitea::DeleteFileInteractor.call(current_user, params.merge(identifier: @project.identifier))
    if interactor.success?
      @file = interactor.result
      render_result(1, "文件删除成功")
    else
      render_error(interactor.error)
    end
  end

  private

  def find_project
    @project = Project.find params[:id]
    render_not_found("未找到相关的仓库") unless @project
  end

  def authorizate!
    if @project.repository.hidden? && !@project.member?(current_user)
      render_forbidden
    end
  end

  def content_params
    {
      filepath: params[:filepath],
      branch: params[:branch],
      new_branch: params[:new_branch],
      content: params[:content],
      message: params[:message],
      identifier: @project.identifier
    }
  end

end
