class PullRequestsController < ApplicationController
  before_action :require_login, except: [:index, :show]
  before_action :load_repository
  before_action :set_user, only: [:new, :get_branches]
  before_action :find_pull_request, except: [:index, :new, :create, :check_can_merge,:get_branches,:create_merge_infos]
  # before_action :get_relatived, only: [:edit]
  include TagChosenHelper
  include ApplicationHelper


  def index
    # @issues = Gitea::PullRequest::ListService.new(@user,@repository.try(:identifier)).call   #通过gitea获取
    issues = @project.issues.issue_pull_request.issue_index_includes.includes(pull_request: :user)
    issues = issues.where(is_private: false) unless current_user.present? && (current_user.admin? || @project.member?(current_user))
    @all_issues_size = issues.size
    @open_issues_size = issues.joins(:pull_request).where(pull_requests: {status: 0}).size
    @close_issues_size = issues.joins(:pull_request).where(pull_requests: {status: 2}).size
    @merged_issues_size = issues.joins(:pull_request).where(pull_requests: {status: 1}).size
    @user_admin_or_member = current_user.present? && (current_user.admin || @project.member?(current_user))

    scopes = Issues::ListQueryService.call(issues,params.delete_if{|k,v| v.blank?}, "PullRequest")
    @issues_size = scopes.size
    @issues = paginate(scopes)
  end

  def new
    @all_branches = PullRequests::BranchesService.new(@user, @project).call
    @is_fork = @project.forked_from_project_id.present?
    @projects_names = [{
      project_user_login: @user.try(:login),
      project_name: "#{@user.try(:show_real_name)}/#{@repository.try(:identifier)}",
      project_id: @project.identifier,
      id: @project.id
    }]
    @merge_projects = @projects_names
    fork_project = @project.fork_project if @is_fork
    if fork_project.present?
      @merge_projects.push({
        project_user_login: fork_project.owner.try(:login),
        project_name: "#{fork_project.owner.try(:show_real_name)}/#{fork_project.repository.try(:identifier)}",
        project_id: fork_project.identifier,
        id: fork_project.id
      })
    end
  end

  def get_branches
    branch_result = PullRequests::BranchesService.new(@user, @project).call
    render json: branch_result
    # return json: branch_result
  end

  def create
    if params[:title].nil?
      normal_status(-1, "名称不能为空")
    elsif params[:issue_tag_ids].nil?
      normal_status(-1, "标签不能为空")
    else
      ActiveRecord::Base.transaction do
        begin
          merge_params
          pull_issue = Issue.new(@issue_params)
          if pull_issue.save!
            pr_params = {
              user_id: current_user.try(:id),
              project_id: @project.id,
              issue_id: pull_issue.id,
              fork_project_id: params[:fork_project_id],
              is_original: params[:is_original]
            }
            local_requests = PullRequest.new(@local_params.merge(pr_params))
            if local_requests.save
              remote_pr_params = @local_params
              if local_requests.is_original && params[:merge_user_login]
                remote_pr_params = remote_pr_params.merge(head: "#{params[:merge_user_login]}:#{params[:head]}").compact

                gitea_request = Gitea::PullRequest::CreateService.call(current_user.try(:gitea_token), @project.fork_project.owner, @project.fork_project.try(:identifier), remote_pr_params.except(:milestone))
              else
                gitea_request = Gitea::PullRequest::CreateService.call(current_user.try(:gitea_token), @project.owner, @repository.try(:identifier), remote_pr_params.except(:milestone))

              end
              #remote_pr_params = remote_pr_params.merge(head: "#{params[:merge_user_login]}:#{params[:head]}").compact if local_requests.is_original && params[:merge_user_login]

              #gitea_request = Gitea::PullRequest::CreateService.call(current_user.try(:gitea_token), @project.owner, @repository.try(:identifier), remote_pr_params.except(:milestone))
              if gitea_request && local_requests.update_attributes(gpid: gitea_request["number"])
                if params[:issue_tag_ids].present?
                  params[:issue_tag_ids].each do |tag|
                    IssueTagsRelate.create!(issue_id: pull_issue.id, issue_tag_id: tag)
                  end
                end

                if params[:assigned_to_id].present?
                  Tiding.create!(user_id: params[:assigned_to_id], trigger_user_id: current_user.id,
                                 container_id: local_requests.id, container_type: 'PullRequest',
                                 parent_container_id: @project.id, parent_container_type: "Project",
                                 tiding_type: 'pull_request', status: 0)
                end
                local_requests.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "create")
                if params[:title].to_s.include?("WIP:")
                  pull_issue.custom_journal_detail("WIP", "", "这个合并请求被标记为尚未完成的工作。完成后请从标题中移除WIP:前缀。", current_user&.id)
                end
                # render :json => { status: 0, message: "PullRequest创建成功", id:  pull_issue.id}
                normal_status(0, "PullRequest创建成功")
              else
                normal_status(-1, "PullRequest创建失败")
              end
            else
              normal_status(-1, "PullRequest创建失败")
            end
          end
        rescue => e
          normal_status(-1, e.message)
          raise ActiveRecord::Rollback
        end
      end
    end
  end

  def edit
    @fork_project_user_name = @project&.fork_project&.owner.try(:show_real_name)
    @fork_project_user = @project&.fork_project&.owner.try(:login)
    @fork_project_identifier = @project&.fork_project&.repository.try(:identifier)
  end

  def update
    if params[:title].nil?
      normal_status(-1, "名称不能为空")
    elsif params[:issue_tag_ids].nil?
      normal_status(-1, "标签不能为空")
    else
      ActiveRecord::Base.transaction do
        begin
          merge_params

          if params[:issue_tag_ids].present? && !@issue&.issue_tags_relates.where(issue_tag_id: params[:issue_tag_ids]).exists?
            @issue&.issue_tags_relates&.destroy_all
            params[:issue_tag_ids].each do |tag|
              IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
            end
          end

          if @issue.update_attributes(@issue_params)
            if @pull_request.update_attributes(@local_params.compact)
              gitea_request = Gitea::PullRequest::UpdateService.new(@project.owner, @repository.try(:identifier), @requests_params, @pull_request.try(:gpid)).call
              if gitea_request
                if params[:issue_tag_ids].present?
                  params[:issue_tag_ids].each do |tag|
                    IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
                  end
                end
                if params[:status_id].to_i == 5
                  @issue.issue_times.update_all(end_time: Time.now)
                end
                normal_status(0, "PullRequest更新成功")
              else
                normal_status(-1, "PullRequest更新失败")
              end
            else
              normal_status(-1, "PullRequest更新失败")
            end
          end
        rescue => e
          normal_status(-1, e.message)
          raise ActiveRecord::Rollback
        end
      end
    end

  end

  def refuse_merge
    ActiveRecord::Base.transaction do
      begin
        @pull_request.update(status: 2)
        @pull_request.issue.update(status_id: 5)
        normal_status(1, "已拒绝")
      rescue => e
        normal_status(-1, e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def create_merge_infos
    get_relatived
  end

  def show
    @issue_user = @issue.user
    @issue_assign_to = @issue.get_assign_user

  end

  def pr_merge
    return render_forbidden("你没有权限操作.") if @project.reporter?(current_user)

    if params[:do].blank?
      normal_status(-1, "请选择合并方式")
    else
      ActiveRecord::Base.transaction do
        begin
          requests_params = {
            Do: params[:do],
            MergeMessageField: params[:body],
            MergeTitleField: params[:title]
          }
          merge_pr = Gitea::PullRequest::MergeService.call(current_user.gitea_token, @project.owner.login,
            @repository.try(:identifier), @pull_request.try(:gpid), requests_params)
          if @pull_request.update_attribute(:status, 1) && merge_pr[:status].to_i == 200
            @pull_request&.project_trends&.update_all(action_type: "close")
            @issue&.custom_journal_detail("merge", "", "该合并请求已被合并", current_user&.id)
            normal_status(1, "合并成功")
          else
            normal_status(-1, "合并失败")
          end
        rescue => e
          normal_status(-1, e.message)
          raise ActiveRecord::Rollback
        end
      end
    end
  end


  def check_can_merge
    target_head = params[:head]  #源分支
    target_base = params[:base]  #目标分支
    is_original = params[:is_original]
    if target_head.blank? || target_base.blank?
      normal_status(-2, "请选择分支")
    elsif target_head === target_base && !is_original
      normal_status(-2, "分支内容相同，无需创建合并请求")
    else
      can_merge = @project&.pull_requests.where(user_id: current_user&.id, head: target_head, base: target_base, status: 0, is_original: is_original, fork_project_id: params[:fork_project_id])
      if can_merge.present?
        render json: {
          status: -2,
          message: "在这些分支之间的合并请求已存在：<a href='/projects/#{@project.id}/merge/#{can_merge.first.id}/Messagecount''>#{can_merge.first.try(:title)}</a>",
        }
      else
        normal_status(0, "可以合并")
      end
    end
  end


  private
  def set_user
    @user = @project.owner
  end

  def find_pull_request
    @pull_request = PullRequest.find_by_id(params[:id])
    @issue = @pull_request&.issue
    if @pull_request.blank?
      normal_status(-1, "合并请求不存在")
    elsif @issue.present? && @issue.is_lock &&!(@project.member?(current_user) || current_user.admin?)
      normal_status(-1, "您没有权限")
    end
  end

  def get_relatived
    @project_tags = @project.issue_tags&.select(:id,:name, :color).as_json
    @project_versions = @project.versions&.select(:id,:name, :status).as_json
    @project_members = @project.members_user_infos
    @project_priories = IssuePriority&.select(:id,:name, :position).as_json
  end

  def merge_params
    @local_params = {
      title: params[:title],  #标题
      body:	params[:body],  #内容
      head: params[:head],  #源分支
      base: params[:base],  #目标分支
      milestone: 0,  #里程碑,未与本地的里程碑关联
    }
    @requests_params = @local_params.merge({
      assignee: current_user.try(:login),
      assignees: ["#{params[:assigned_login].to_s}"],
      labels: params[:issue_tag_ids],
      due_date: Time.now
    })
    @issue_params = {
      author_id: current_user.id,
      project_id: @project.id,
      subject: params[:title],
      description: params[:body],
      assigned_to_id: params[:assigned_to_id],
      fixed_version_id: params[:fixed_version_id],
      issue_tags_value: params[:issue_tag_ids].present? ? params[:issue_tag_ids].join(",") : "",
      priority_id: params[:priority_id] || "2",
      issue_classify: "pull_request",
      issue_type: params[:issue_type] || "1",
      tracker_id: 2,
      status_id: 1,
    }
  end
end
