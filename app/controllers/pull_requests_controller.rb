class PullRequestsController < ApplicationController
  before_action :require_login, except: [:index, :show, :files, :commits]
  before_action :require_profile_completed, only: [:create]
  before_action :load_repository
  before_action :check_menu_authorize
  before_action :find_pull_request, except: [:index, :new, :create, :check_can_merge,:get_branches,:create_merge_infos, :files, :commits]
  before_action :load_pull_request, only: [:files, :commits]
  before_action :find_atme_receivers, only: [:create, :update]
  include TagChosenHelper
  include ApplicationHelper


  def index
    # @issues = Gitea::PullRequest::ListService.new(@user,@repository.try(:identifier)).call   #通过gitea获取
    issues = @project.issues.issue_pull_request.issue_index_includes.includes(pull_request: :user)
    issues = issues.where(is_private: false) unless current_user.present? && (current_user.admin? || @project.member?(current_user))
    @all_issues = issues.distinct
    @filter_issues = @all_issues
    @filter_issues = @filter_issues.where("subject LIKE ? OR description LIKE ? ", "%#{params[:search]}%", "%#{params[:search]}%") if params[:search].present?
    @open_issues = @filter_issues.joins(:pull_request).where(pull_requests: {status: PullRequest::OPEN})
    @close_issues = @filter_issues.joins(:pull_request).where(pull_requests: {status: PullRequest::CLOSED})
    @merged_issues = @filter_issues.joins(:pull_request).where(pull_requests: {status: PullRequest::MERGED})
    @user_admin_or_member = current_user.present? && (current_user.admin || @project.member?(current_user))
    @user_admin_or_developer = current_user.present? && (current_user.admin || @project.all_developers.include?(current_user))

    scopes = Issues::ListQueryService.call(issues,params.delete_if{|k,v| v.blank?}, "PullRequest")
    @issues_size = scopes.size
    @issues = paginate(scopes)
  end

  def new
    @all_branches = Branches::ListService.call(@owner, @project)
    @is_fork = @project.forked_from_project_id.present?
    @projects_names = [{
      project_user_login: @owner.try(:login),
      project_name: "#{@owner.try(:show_real_name)}/#{@repository.try(:identifier)}",
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
    branch_result = Branches::ListService.call(@owner, @project)
    render json: branch_result
    # return json: branch_result
  end

  def create
    ActiveRecord::Base.transaction do
      @pull_request, @gitea_pull_request = PullRequests::CreateService.call(current_user, @owner, @project, params)
      if @gitea_pull_request[:status] == :success
        @pull_request.bind_gitea_pull_request!(@gitea_pull_request[:body]["number"], @gitea_pull_request[:body]["id"])
        SendTemplateMessageJob.perform_later('PullRequestAssigned', current_user.id, @pull_request&.id) if Site.has_notice_menu?
        SendTemplateMessageJob.perform_later('ProjectPullRequest', current_user.id, @pull_request&.id) if Site.has_notice_menu?
        Rails.logger.info "[ATME] maybe to at such users: #{@atme_receivers.pluck(:login)}"
        AtmeService.call(current_user, @atme_receivers, @pull_request) if @atme_receivers.size > 0
      else
        render_error("create pull request error: #{@gitea_pull_request[:status]}")
        raise ActiveRecord::Rollback
      end
    end
  end

  def edit
    @fork_project_user_name = @pull_request&.fork_project&.owner.try(:show_real_name)
    @fork_project_user = @pull_request&.fork_project&.owner.try(:login)
    @fork_project_identifier = @pull_request&.fork_project&.repository.try(:identifier)
  end

  def update
    if params[:title].nil?
      normal_status(-1, "名称不能为空")
    elsif params[:issue_tag_ids].nil?
      normal_status(-1, "标记不能为空")
    else
      ActiveRecord::Base.transaction do
        begin
          merge_params

          @issue&.issue_tags_relates&.destroy_all if params[:issue_tag_ids].blank?
          if params[:issue_tag_ids].present? && !@issue&.issue_tags_relates.where(issue_tag_id: params[:issue_tag_ids]).exists?
            @issue&.issue_tags_relates&.destroy_all
            params[:issue_tag_ids].each do |tag|
              IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
            end
          end

          if @issue.update_attributes(@issue_params)
            if @pull_request.update_attributes(@local_params.compact)
              gitea_pull = Gitea::PullRequest::UpdateService.call(@owner.login, @repository.identifier,
                  @pull_request.gitea_number, @requests_params, current_user.gitea_token)

              if gitea_pull[:status] === :success
                if params[:issue_tag_ids].present?
                  params[:issue_tag_ids].each do |tag|
                    IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
                  end
                end
                if params[:status_id].to_i == 5
                  @issue.issue_times.update_all(end_time: Time.now)
                end
                Rails.logger.info "[ATME] maybe to at such users: #{@atme_receivers.pluck(:login)}"
                AtmeService.call(current_user, @atme_receivers, @pull_request) if @atme_receivers.size > 0
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
        SendTemplateMessageJob.perform_later('PullRequestChanged', current_user.id, @pull_request&.id, @issue.previous_changes.slice(:assigned_to_id, :priority_id, :fixed_version_id, :issue_tags_value)) if Site.has_notice_menu?
        SendTemplateMessageJob.perform_later('PullRequestAssigned', current_user.id, @pull_request&.id ) if @issue.previous_changes[:assigned_to_id].present? && Site.has_notice_menu?
      end
    end

  end

  def refuse_merge
    ActiveRecord::Base.transaction do
      begin
        colsed = PullRequests::CloseService.call(@owner, @repository, @pull_request, current_user)
        if colsed === true 
          @pull_request.project_trends.create!(user: current_user, project: @project,action_type: ProjectTrend::CLOSE)
          SendTemplateMessageJob.perform_later('PullRequestClosed', current_user.id, @pull_request.id) if Site.has_notice_menu?
          normal_status(1, "已拒绝") 
        else
          normal_status(-1, '合并失败')
        end
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
    @gitea_pull = Gitea::PullRequest::GetService.call(@owner.login, 
      @repository.identifier, @pull_request.gitea_number, current_user&.gitea_token)
  end

  def pr_merge
    return render_forbidden("你没有权限操作.") unless @project.operator?(current_user)

    if params[:do].blank?
      normal_status(-1, "请选择合并方式")
    else
      ActiveRecord::Base.transaction do
        begin
          @gitea_pull = Gitea::PullRequest::GetService.call(@owner.login, @repository.identifier, @pull_request.gitea_number, current_user&.gitea_token)

          if @gitea_pull["merged_by"].present?
            success_condition = true
          else
            result = PullRequests::MergeService.call(@owner, @repository, @pull_request, current_user, params)
            success_condition = result.status == 200
          end

          if success_condition && @pull_request.merge!
            # @pull_request.project_trend_status!
            @pull_request.project_trends.create!(user: current_user, project: @project,action_type: ProjectTrend::MERGE)
            @issue&.custom_journal_detail("merge", "", "该合并请求已被合并", current_user&.id)
            SendTemplateMessageJob.perform_later('PullRequestMerged', current_user.id, @pull_request.id) if Site.has_notice_menu?
            normal_status(1, "合并成功")
          else
            normal_status(-1, result.message)
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
      can_merge = @project&.pull_requests.where(head: target_head, base: target_base, status: 0, is_original: is_original, fork_project_id: params[:fork_project_id])
      if can_merge.present?
        render json: {
          status: -2,
          message: "在这些分支之间的合并请求已存在：<a href='/#{@owner.login}/#{@project.identifier}/pulls/#{can_merge.first.id}''>#{can_merge.first.try(:title)}</a>",
        }
      else
        normal_status(0, "可以合并")
      end
    end
  end


  def files
    @files_result = Gitea::PullRequest::FilesService.call(@owner.login, @project.identifier, @pull_request.gitea_number, current_user&.gitea_token)
    # render json: @files_result
  end

  def commits
    @commits_result = Gitea::PullRequest::CommitsService.call(@owner.login, @project.identifier, @pull_request.gitea_number, current_user&.gitea_token)
    # render json: @commits_result
  end

  private
  def load_pull_request
    @pull_request = PullRequest.find params[:id]
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
    @project_members = @project.all_developers
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
      # assignees: ["#{params[:assigned_login].to_s}"],
      assignees: ["#{current_user.try(:login).to_s}"],
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

  def check_menu_authorize
    return render_not_found unless @project.has_menu_permission("pulls")
  end
end
