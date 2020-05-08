class PullRequestsController < ApplicationController
  before_action :require_login, except: [:index, :show]
  before_action :find_project_with_id
  before_action :set_repository
  before_action :find_pull_request, except: [:index, :new, :create, :check_can_merge]
  include TagChosenHelper
  include ApplicationHelper


  def index
    # @issues = Gitea::PullRequest::ListService.new(@user,@repository.try(:identifier)).call   #通过gitea获取
    issues = @project.issues.issue_pull_request.includes(:user,:tracker, :priority, :version, :issue_status, :journals, :issue_times)
    issues = issues.where(is_private: false) unless current_user.present? && (current_user.admin? || @project.member?(current_user))
    @all_issues_size = issues.size
    @open_issues_size = issues.where.not(status_id: 5).size
    @close_issues_size = issues.where(status_id: 5).size
    @assign_to_me_size = issues.where(assigned_to_id: current_user&.id).size
    @my_published_size = issues.where(author_id: current_user&.id).size
    @user_admin_or_member = current_user.present? && (current_user.admin || @project.member?(current_user))

    scopes = Issues::ListQueryService.call(issues,params)

    @page = params[:page]
    @limit = params[:limit] || 15
    @issues_size = scopes.size
    @issues = scopes.page(@page).per(@limit)
  end

  def new
    @all_branches = []
    get_all_branches = Gitea::Repository::BranchesService.new(@user, @repository.try(:identifier)).call
    if get_all_branches && get_all_branches.size > 0
      get_all_branches.each do |b|
        @all_branches.push(b["name"])
      end
    end
    @project_tags = @project.issue_tags&.select(:id,:name, :color).as_json
    @project_versions = @project.versions&.select(:id,:name, :status).as_json
    @project_members = @project.members_user_infos
  end

  def create

    if params[:title].nil?
      normal_status(-1, "名称不能为空")
    elsif params[:issue_tag_ids].nil?
      normal_status(-1, "标签不能为空")
    else
      ActiveRecord::Base.transaction do
        begin
          local_params = {
            title: params[:title],  #标题
            body:	params[:body],  #内容
            head: params[:head],  #源分支
            base: params[:base],  #目标分支
            milestone: 0,  #里程碑,未与本地的里程碑关联
          }
          requests_params = local_params.merge({
            assignee: current_user.try(:login),
            assignees: ["#{params[:assigned_login].to_s}"],
            labels: params[:issue_tag_ids],
            due_date: Time.now
          })
          issue_params = {
            author_id: current_user.id,
            project_id: @project.id,
            subject: params[:title],
            description: params[:body],
            assigned_to_id: params[:assigned_to_id],
            fixed_version_id: params[:fixed_version_id],
            issue_tags_value: params[:issue_tag_ids].present? ? params[:issue_tag_ids].join(",") : "",
            issue_classify: "pull_request",
            issue_type: params[:issue_type] || "1",
            tracker_id: 2,
            status_id: 1,
            priority_id: 1
          }
          pull_issue = Issue.new(issue_params)
          if pull_issue.save!
            local_requests = PullRequest.new(local_params.merge(user_id: current_user.try(:id), project_id: @project.id, issue_id: pull_issue.id))
            if local_requests.save
              gitea_request = Gitea::PullRequest::CreateService.new(current_user.try(:gitea_token), @project.owner, @repository.try(:identifier), requests_params).call
              if gitea_request && local_requests.update_attributes(gpid: gitea_request["number"])
                if params[:issue_tag_ids].present?
                  params[:issue_tag_ids].each do |tag|
                    IssueTagsRelate.create!(issue_id: pull_issue.id, issue_tag_id: tag)
                  end
                end
                if params[:attachment_ids].present?
                  params[:attachment_ids].each do |id|
                    attachment = Attachment.select(:id, :container_id, :container_type)&.find_by_id(id)
                    unless attachment.blank?
                      attachment.container = pull_issue
                      attachment.author_id = current_user.id
                      attachment.description = ""
                      attachment.save
                    end
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
    @issue_chosen = issue_left_chosen(@project, @issue.id)
    @issue_attachments = @issue.attachments
  end

  def update
    if params[:title].nil?
      normal_status(-1, "名称不能为空")
    elsif params[:issue_tag_ids].nil?
      normal_status(-1, "标签不能为空")
    else
      ActiveRecord::Base.transaction do
        begin
          local_params = {
            title: params[:title],  #标题
            body:	params[:body],  #内容
            head: params[:head],  #源分支
            base: params[:base],  #目标分支
            milestone: 0,  #里程碑，未与本地的里程碑关联
          }
          requests_params = local_params.merge({
                                                 assignee: current_user.try(:login),
                                                 assignees: ["#{params[:assigned_login].to_s}"],
                                                 labels: params[:issue_tag_ids]
                                               })
          issue_params = {
            subject: params[:title],
            description: params[:body],
            assigned_to_id: params[:assigned_to_id].to_s,
            fixed_version_id: params[:fixed_version_id],
            issue_tags_value: params[:issue_tag_ids].present? ? params[:issue_tag_ids].join(",") : "",
          }

          if params[:issue_tag_ids].present? && !@issue&.issue_tags_relates.where(issue_tag_id: params[:issue_tag_ids]).exists?
            @issue&.issue_tags_relates&.destroy_all
            params[:issue_tag_ids].each do |tag|
              IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
            end
          end

          if @issue.update_attributes(issue_params)
            if @pull_request.update_attributes(local_params)
              gitea_request = Gitea::PullRequest::UpdateService.new(current_user, @repository.try(:identifier), requests_params, @pull_request.try(:gpid)).call
              if gitea_request
                issue_files = params[:attachment_ids]
                change_files = false
                issue_file_ids = []

                if issue_files.present?
                  change_files = true
                  issue_files.each do |id|
                    attachment = Attachment.select(:id, :container_id, :container_type)&.find_by_id(id)
                    unless attachment.blank?
                      attachment.container = @issue
                      attachment.author_id = current_user.id
                      attachment.description = ""
                      attachment.save
                    end
                  end
                end
                if params[:issue_tag_ids].present?
                  params[:issue_tag_ids].each do |tag|
                    IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
                  end
                end
                if params[:status_id].to_i == 5
                  @issue.issue_times.update_all(end_time: Time.now)
                end
                @issue.create_journal_detail(change_files, issue_files, issue_file_ids, current_user&.id)
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

  def simple_update
    ActiveRecord::Base.transaction do
      begin
        issue_params = {
          assigned_to_id: params[:assigned_to_id].to_s,
          fixed_version_id: params[:fixed_version_id],
          issue_tags_value: params[:issue_tag_ids].present? ? params[:issue_tag_ids].join(",") : "",
        }
        if params[:issue_tag_ids].blank?
          @issue&.issue_tags_relates&.destroy_all
        end

        if params[:issue_tag_ids].present? && !@issue&.issue_tags_relates.where(issue_tag_id: params[:issue_tag_ids]).exists?
          @issue&.issue_tags_relates&.destroy_all
          params[:issue_tag_ids].each do |tag|
            IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
          end
        end

        if @issue.update_attributes(issue_params)
          normal_status(0, "PullRequest更新成功")
        else
          normal_status(-1, "PullRequest更新成功")
        end
      rescue => e
        normal_status(-1, e.message)
        raise ActiveRecord::Rollback
      end
    end

  end

  def show
    @user_permission = current_user.present? && current_user.logged? && (!@issue.is_lock || @project.member?(current_user) || current_user.admin? || @issue.user == current_user)
    @issue_attachments = @issue.attachments
    @issue_user = @issue.user
    @issue_assign_to = @issue.get_assign_user
    @join_users = join_users(@issue)
    #总耗时
    cost_time(@issue)

    #被依赖
    @be_depended_issues_array = be_depended_issues(@issue)

    #依赖于
    depended_issues(@issue)
  end

  def pr_merge
    if params[:do].blank?
      normal_status(-1, "请选择合并方式")
    else
      ActiveRecord::Base.transaction do
        begin
          requests_params = {
            do: params[:do],
            MergeMessageField: params[:body],
            MergeTitleField: params[:title]
          }
          merge_pr = Gitea::PullRequest::MergeService.new(current_user, @repository.try(:identifier), @pull_request.try(:gpid), requests_params).call
          if @pull_request.update_attribute(:status, 1) && merge_pr[:status].to_i == 200
            # @pull_request.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "merge")
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

  #评审
  def check_merge
    notes = params[:content]
    pull_request_status = params[:status]
    if notes.blank?
      normal_status(-1, "评论内容不能为空")
    else
      if @pull_request.status > 0
        normal_status(-1, "已合并，不能评审")
      else
        if pull_request_status.to_i == 1
          message = "评审通过："
        elsif pull_request_status.to_i == 2
          message = "评审请求变更："
        else
          message = ""
        end
        journal_params = {
          journalized_id: @issue.id ,
          journalized_type: "Issue",
          user_id: current_user.id ,
          notes: message + notes.to_s.strip
        }
        journal = Journal.new journal_params
        if journal.save
          if pull_request_status.present?
            @pull_request.update_attribute(:status, pull_request_status.to_i)
          end
          if pull_request_status.to_i == 1
            requests_params = {
              do: "merge",
              MergeMessageField: notes,
              MergeTitleField: "Merge PullRequest ##{@pull_request.gpid}"
            }
            merge_pr = Gitea::PullRequest::MergeService.new(current_user, @repository.try(:identifier), @pull_request.try(:gpid), requests_params).call
            if merge_pr
              @pull_request&.project_trends&.update_all(action_type: "close")
              # @pull_request.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "merge")
              @issue.custom_journal_detail("merge", "", "该合并请求已被合并", current_user&.id)
              normal_status(1, "评审成功")
            else
              normal_status(-1, "评审失败")
            end
          end
          normal_status(0, "评审成功")
        else
          normal_status(-1, "评审失败")
        end
      end
    end
  end

  def check_can_merge
    target_head = params[:head]  #源分支
    target_base = params[:base]  #目标分支
    if target_head.blank? || target_base.blank?
      normal_status(-1, "请选择分支。")
    elsif target_head === target_base
      normal_status(-1, "分支内容相同，无需创建合并请求。")
    else
      can_merge = @project&.pull_requests.where(user_id: current_user&.id, head: target_head, base: target_base, status: 0)
      if can_merge.present?
        render json: {
          status: -2,
          message: "在这些分支之间的合并请求已存在",
          pull_request_id: can_merge.first.id,
          pull_request_name: can_merge.first.try(:title)
        }
      else
        normal_status(0, "可以合并")
      end
    end
  end


  private

  def set_repository
    # @project = Project.find_by_identifier! params[:id]
    @repository = @project.repository
    @user = @project.owner
    # normal_status(-1, "项目不存在") unless @project.present?
    normal_status(-1, "仓库不存在") unless @repository.present?
    normal_status(-1, "用户不存在") unless @user.present?
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
end