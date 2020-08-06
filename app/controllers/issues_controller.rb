class IssuesController < ApplicationController
  before_action :require_login, except: [:index, :show, :index_chosen]
  before_action :find_project_with_id
  before_action :set_project_and_user
  before_action :check_issue_permission
  before_action :check_project_public, only: [:index ,:show, :copy, :index_chosen, :close_issue]

  before_action :set_issue, only: [:edit, :update, :destroy, :show, :copy, :close_issue, :lock_issue]
  before_action :get_branches, only: [:new, :edit]

  include ApplicationHelper
  include TagChosenHelper

  def index
    @user_admin_or_member = current_user.present? && current_user.logged? && (current_user.admin || @project.member?(current_user))
    issues = @project.issues.issue_issue.issue_index_includes
    issues = issues.where(is_private: false) unless @user_admin_or_member
    
    @all_issues_size = issues.size
    @open_issues_size = issues.where.not(status_id: 5).size
    @close_issues_size = issues.where(status_id: 5).size
    @assign_to_me_size = issues.where(assigned_to_id: current_user&.id).size
    @my_published_size = issues.where(author_id: current_user&.id).size
    scopes = Issues::ListQueryService.call(issues,params.delete_if{|k,v| v.blank?}, "Issue")
    @issues_size = scopes.size
    @issues = paginate(scopes)

    respond_to do |format|
      format.json
      #导出功能暂未做，可以考虑隐藏
      # format.xlsx{
        # set_export_cookies
        # export_issues(@issues)
        # export_name = "#{@project.name}_issues列表_#{Time.now.strftime('%Y%m%d_%H%M%S')}"
        # render xlsx: "#{export_name.strip}",template: "issues/index.xlsx.axlsx",locals: {table_columns:@table_columns,issues:@export_issues}
      # }
    end
  end

  def index_chosen
    @issue_chosen = issue_left_chosen(@project, nil)
  end

  def commit_issues
    issues = @project.issues.issue_issue.includes(:user,:tracker)
    issues = issues.where(is_private: false) unless current_user.present? && (current_user.admin? || @project.member?(current_user))
    @all_issues_size = issues.size
    @open_issues_size = issues.where.not(status_id: 5).size
    @close_issues_size = issues.where(status_id: 5).size
    @normal_issues_size = issues.where(issue_type: "1").size
    @pay_issues_size = issues.where(issue_type: "2").size

    status_type = params[:status_type].to_s

    if status_type.to_s == "1"  #表示开启中的
      issues = issues.where.not(status_id: 5)
    elsif status_type.to_s == "2"   #表示关闭中的
      issues = issues.where(status_id: 5)
    elsif  status_type.to_s == "3"  #普通
      issues = issues.where(issue_type: "1")
    elsif  status_type.to_s == "4"  #悬赏
      issues = issues.where(issue_type: "2")
    end

    @commit_issues = []
    total_commit_issues = {
      name: "合计",
      user_login: nil,
      all_count: issues.size,
      trackers: trackers_size(issues)
    }
    @commit_issues.push(total_commit_issues)

    members = issues.pluck(:assigned_to_id).uniq
    members.each do |m|
      user = User.select(:id, :login, :firstname, :lastname).find(m)
      user_issues = issues.where(assigned_to_id: m)  #指派给
      member_params = {
        name: user.try(:show_real_name),
        user_login: user.try(:login),
        all_count: issues.size,
        trackers: trackers_size(user_issues)
      }
      @commit_issues.push(member_params)
    end

    un_assign = issues.where(assigned_to_id: nil)
    total_commit_issues = {
      name: "未指派",
      user_login: nil,
      all_count: un_assign.size,
      trackers: trackers_size(un_assign)
    }
    @commit_issues.push(total_commit_issues)

  end

  def new
    @all_branches = get_branches
    @issue_chosen = issue_left_chosen(@project, nil)
  end

  def create
    if params[:subject].blank?
      normal_status(-1, "标题不能为空")
    elsif params[:subject].to_s.size > 255
      normal_status(-1, "标题不能超过255个字符")
    elsif (params[:issue_type].to_s == "2")
      return normal_status(-1, "悬赏的奖金必须大于0") if params[:token].to_i == 0

    else
      issue_params = issue_send_params(params)

      @issue = Issue.new(issue_params)
      if @issue.save!
        if params[:attachment_ids].present?
          params[:attachment_ids].each do |id|
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
            IssueTagsRelate.create!(issue_id: @issue.id, issue_tag_id: tag)
          end
        end
        if params[:assigned_to_id].present?
          Tiding.create!(user_id: params[:assigned_to_id], trigger_user_id: current_user.id,
                         container_id: @issue.id, container_type: 'Issue',
                         parent_container_id: @project.id, parent_container_type: "Project",
                         tiding_type: 'issue', status: 0)
        end

        @issue.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "create")
        # normal_status(0, "创建成功",)
        render :json => { status: 0, message: "创建成功", id:  @issue.id}
      else
        normal_status(-1, "创建失败")
      end
    end

  end

  def edit
    # @all_branches = get_branches
    # @issue_chosen = issue_left_chosen(@project, @issue.id)
    @issue_attachments = @issue.attachments
  end

  def update
    issue_params = issue_send_params(params).except(:issue_classify, :author_id, :project_id)
    return normal_status(-1, "您没有权限修改token") if @issue.will_save_change_to_token? && @issue.user_id != current_user&.id
    if params[:issue_tag_ids].present? && !@issue&.issue_tags_relates.where(issue_tag_id: params[:issue_tag_ids]).exists?
      @issue&.issue_tags_relates&.destroy_all
      params[:issue_tag_ids].each do |tag|
        IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
      end
    end

    if @issue.update_attributes(issue_params)
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

      # if params[:issue_tag_ids].present?
      #   issue_current_tags = @issue&.issue_tags&.select(:id)&.pluck(:id)
      #   new_tag_ids = params[:issue_tag_ids] - issue_current_tags
      #   old_tag_ids = issue_current_tags - params[:issue_tag_ids]
      #   if old_tag_ids.size > 0
      #     @issue.issue_tags_relates.where(issue_tag_id: old_tag_ids).delete_all
      #   end
      #   if new_tag_ids.size > 0
      #     new_tag_ids.each do |tag|
      #       IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
      #     end
      #   end
      # end

      if params[:status_id].to_i == 5
        @issue.issue_times.update_all(end_time: Time.now)
        @issue.update_closed_issues_count_in_project!
      end

      @issue.create_journal_detail(change_files, issue_files, issue_file_ids, current_user&.id)
      normal_status(0, "更新成功")
    else
      normal_status(-1, "更新失败")
    end

  end

  def show
    @user_permission = current_user.present? && current_user.logged? && (!@issue.is_lock || @project.member?(current_user) || current_user.admin? || @issue.user == current_user)
    @issue_attachments = @issue.attachments
    @issue_user = @issue.user
    @issue_assign_to = @issue.get_assign_user
    @join_users = join_users(@issue)
    #总耗时
    # cost_time(@issue)

    # #被依赖
    # @be_depended_issues_array = be_depended_issues(@issue)

    # #依赖于
    # depended_issues(@issue)
  end

  def destroy
    if @issue.destroy
      normal_status(0, "删除成功")
    else
      normal_status(-1, "删除失败")
    end
  end

  def clean
    issue_ids = params[:ids]
    if issue_ids.present?
      if Issue.where(id: issue_ids).destroy_all
        normal_status(0, "删除成功")
      else
        normal_status(-1, "删除失败")
      end
    else
      normal_status(-1, "请选择任务")
    end
  end

  def series_update
    update_hash = {}
    update_hash.merge!(assigned_to_id: params[:assigned_to_id]) if params[:assigned_to_id].present?
    update_hash.merge!(fixed_version_id: params[:fixed_version_id]) if params[:fixed_version_id].present?
    # update_hash.merge!(status_id: params[:status_id]) if params[:status_id].present?
    if params[:status_id].present?
      status_id = params[:status_id].to_i
      update_hash.merge!(status_id: status_id)
      done_ratio = nil
      case status_id
      when 1
        done_ratio = 0
      when 3
        done_ratio = 100
      end
      update_hash.merge!(done_ratio: done_ratio) if done_ratio
    end
    # update_hash = params[:issue]
    issue_ids = params[:ids]
    if issue_ids.present?
      if update_hash.blank?
        normal_status(-1, "请选择批量更新内容")
      elsif Issue.where(id: issue_ids).update_all(update_hash)
        normal_status(0, "批量更新成功")
      else
        normal_status(-1, "批量更新失败")
      end
    else
      normal_status(-1, "请选择任务")
    end
  end

  def copy
    @new_issue = @issue.dup
    if @new_issue.save
      issue_tags = @issue.issue_tags.pluck(:id)
      if issue_tags.present?
        issue_tags.each do |tag|
          IssueTagsRelate.create!(issue_id: @new_issue.id, issue_tag_id: tag)
        end
      end
      @new_issue.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "create")
      @status = 1
    else
      @status = -1
    end
  end

  def close_issue
    type = params[:status_id].to_i || 5

    if type == 5
      message = "关闭"
      old_message = "重新开启"
    else
      message = "重新开启"
      old_message = "关闭"
    end
    if @issue.update_attribute(:status_id, type)
      if type == 5
        @issue&.project_trends&.update_all(action_type: "close")
        @issue.issue_times.update_all(end_time: Time.now)
        if @issue.issue_classify.to_s == "pull_request"
          @issue&.pull_request&.update_attribute(:status, 2)
        end
      else
        @issue&.project_trends&.update_all(action_type: "create")
        if @issue.issue_classify.to_s == "pull_request"
          @issue&.pull_request&.update_attribute(:status, 0)
        end
      end
      if @issue.issue_classify == "issue"
        close_message = "close_issue"
      else
        close_message = "close_pr"
      end
      @issue.custom_journal_detail(close_message,old_message, "#{message}", current_user&.id)
      normal_status(0, message)
    else
      normal_status(-1, "操作失败")
    end
  end

  def lock_issue
    if @issue.user == current_user || current_user.admin?
      type = (params[:lock_type].to_i == 1)
      if @issue.update_attribute(:is_lock, type)
        if type
          @issue.custom_journal_detail("lock_issue","", "因为#{params[:lock_reason].present? ? params[:lock_reason].to_s : "某种原因"}而锁定，并将对话限制为协作者", current_user&.id)
        else
          @issue.custom_journal_detail("unlock_issue","", "解除锁定", current_user&.id)
        end
        normal_status(0, "操作成功")
      else
        normal_status(-1, "操作失败")
      end
    else
      normal_status(-1, "您没有权限")
    end

  end

  private
  def set_project_and_user
    # @project = Project.find_by_identifier(params[:project_id]) || (Project.find params[:project_id]) || (Project.find params[:id])
    @user = @project&.owner
    # normal_status(-1, "项目不存在") unless @project.present?
    normal_status(-1, "用户不存在") unless @user.present?
  end

  def check_project_public
    unless @project.is_public || @project.member?(current_user) || current_user.admin? || (@project.user_id == current_user.id)
      normal_status(-1, "您没有权限")
    end
  end

  def set_issue
    @issue = Issue.find_by_id(params[:id])
    if @issue.blank?
      normal_status(-1, "标签不存在")
    elsif @issue.is_lock &&!(@project.member?(current_user) || current_user.admin?)
      normal_status(-1, "您没有权限")
    end
  end

  def check_issue_permission
    unless @project.is_public || (current_user.present? && (@project.member?(current_user) || current_user&.admin? || (@project.user_id == current_user&.id)))
      normal_status(-1, "您没有权限")
    end
  end

  def export_issues(issues)
    @table_columns = %w(ID 类型 标题	描述	状态	指派给	优先级 标签 发布人 创建时间 里程碑 开始时间 截止时间 完成度 分类 金额 属于)
    @export_issues = []
    issues.each do |i|
      issue_array = [i.id, i.tracker.try(:name), i.subject, i.description, i.issue_status.try(:name),i.get_assign_user.try(:show_real_name),
                     i.priority.try(:name), i.get_issue_tags_name, i.user.try(:show_real_name), format_time(i.created_on), i.version.try(:name),
                     i.start_date.to_s, i.due_date.to_s, i.done_ratio.to_s + "%", i.issue_type == "2" ? "悬赏" : "普通", i.token.to_s, i.issue_classify]

      @export_issues.push(issue_array)

    end
  end

  def trackers_size(issues)
    trackers_id = Tracker.pluck(:id,:name)
    tracker_array = []
    trackers_id.each do |t|
      tracker_info = {
        id: t[0],
        name: t[1],
        issues_count: issues.issues_count(t[0])
      }
      tracker_array.push(tracker_info)
    end
    tracker_array
  end

  def get_branches
    all_branches = []
    get_all_branches = Gitea::Repository::Branches::ListService.new(@user, @project&.repository.try(:identifier)).call
    if get_all_branches && get_all_branches.size > 0
      get_all_branches.each do |b|
        all_branches.push(b["name"])
      end
    end
    all_branches
  end

  def issue_send_params(params)
    {
        subject: params[:subject],
        description: params[:description],
        is_private: params[:is_private] || false,
        assigned_to_id: params[:assigned_to_id],
        tracker_id: params[:tracker_id],
        status_id: params[:status_id],
        priority_id: params[:priority_id],
        fixed_version_id: params[:fixed_version_id],
        start_date: params[:start_date].to_s.to_date || Time.current.to_date,
        due_date: params[:due_date].to_s.to_date,
        estimated_hours: params[:estimated_hours],
        done_ratio: params[:done_ratio],
        issue_type: params[:issue_type] || "1",
        token: params[:token],
        issue_tags_value: params[:issue_tag_ids].present? ? params[:issue_tag_ids].join(",") : "",
        closed_on: (params[:status_id].to_i == 5) ? Time.current : nil,
        branch_name: params[:branch_name].to_s,
        issue_classify: "issue",
        author_id: current_user.id,
        project_id: @project.id
      }
  end
end
