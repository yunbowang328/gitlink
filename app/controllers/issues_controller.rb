class IssuesController < ApplicationController
  before_action :require_login, except: [:index, :show, :index_chosen]
  before_action :require_profile_completed, only: [:create]
  before_action :load_project
  before_action :set_user
  before_action :check_menu_authorize, except: [:index_chosen]
  before_action :check_issue_permission
  before_action :operate_issue_permission, only:[:create, :update, :destroy, :clean, :series_update, :copy]
  before_action :check_project_public, only: [:index ,:show, :copy, :index_chosen, :close_issue]

  before_action :set_issue, only: [:edit, :update, :destroy, :show, :copy, :close_issue, :lock_issue]
  before_action :check_token_enough, :find_atme_receivers, only: [:create, :update]

  include ApplicationHelper
  include TagChosenHelper

  def index
    @user_admin_or_member = current_user.present? && current_user.logged? && (current_user.admin || @project.member?(current_user) || @project.is_public?)
    issues = @project.issues.issue_issue.issue_index_includes
    issues = issues.where(is_private: false) unless @user_admin_or_member

    @all_issues = issues
    @filter_issues = @all_issues
    @filter_issues = @filter_issues.where.not(status_id: IssueStatus::CLOSED) if params[:status_type].to_i == IssueStatus::ADD
    @filter_issues = @filter_issues.where(status_id: IssueStatus::CLOSED) if params[:status_type].to_i == IssueStatus::SOLVING
    @filter_issues = @filter_issues.where("subject LIKE ? OR description LIKE ? ", "%#{params[:search]}%", "%#{params[:search]}%") if params[:search].present?
    @open_issues = @all_issues.where.not(status_id: IssueStatus::CLOSED)
    @close_issues = @all_issues.where(status_id: IssueStatus::CLOSED)
    @assign_to_me = @filter_issues.where(assigned_to_id: current_user&.id)
    @my_published = @filter_issues.where(author_id: current_user&.id)
    scopes = Issues::ListQueryService.call(issues,params.delete_if{|k,v| v.blank?}, "Issue")
    @issues_size = scopes.size
    @issues = paginate(scopes)

    respond_to do |format|
      format.json
      #??????????????????????????????????????????
      # format.xlsx{
        # set_export_cookies
        # export_issues(@issues)
        # export_name = "#{@project.name}_issues??????_#{Time.now.strftime('%Y%m%d_%H%M%S')}"
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

    if status_type.to_s == "1"  #??????????????????
      issues = issues.where.not(status_id: 5)
    elsif status_type.to_s == "2"   #??????????????????
      issues = issues.where(status_id: 5)
    elsif  status_type.to_s == "3"  #??????
      issues = issues.where(issue_type: "1")
    elsif  status_type.to_s == "4"  #??????
      issues = issues.where(issue_type: "2")
    end

    @commit_issues = []
    total_commit_issues = {
      name: "??????",
      user_login: nil,
      all_count: issues.size,
      trackers: trackers_size(issues)
    }
    @commit_issues.push(total_commit_issues)

    members = issues.pluck(:assigned_to_id).uniq
    members.each do |m|
      user = User.select(:id, :login, :firstname, :lastname).find(m)
      user_issues = issues.where(assigned_to_id: m)  #?????????
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
      name: "?????????",
      user_login: nil,
      all_count: un_assign.size,
      trackers: trackers_size(un_assign)
    }
    @commit_issues.push(total_commit_issues)

  end

  def new
    @issue_chosen = get_associated_data(@project)
  end

  def create
    issue_params = issue_send_params(params)
    Issues::CreateForm.new({subject:issue_params[:subject]}).validate!
    @issue = Issue.new(issue_params)
    if @issue.save!
      SendTemplateMessageJob.perform_later('IssueAssigned', current_user.id, @issue&.id) if Site.has_notice_menu?
      SendTemplateMessageJob.perform_later('ProjectIssue', current_user.id, @issue&.id) if Site.has_notice_menu?
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

      #??????????????????, ???????????????????????????
      if params[:issue_type].to_s == "2"
        post_to_chain("minus", params[:token].to_i, current_user.try(:login))
      end

      @issue.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "create")

      Rails.logger.info "[ATME] maybe to at such users: #{@atme_receivers.pluck(:login)}"
      AtmeService.call(current_user, @atme_receivers, @issue) if @atme_receivers.size > 0

      render json: {status: 0, message: "?????????", id: @issue.id}
    else
      normal_status(-1, "????????????")
    end
  rescue Exception => exception
    puts exception.message
    normal_status(-1, exception.message)
  end

  def edit
    # @issue_chosen = issue_left_chosen(@project, @issue.id)
    @cannot_edit_tags = @issue.issue_type=="2" && @issue.status_id == 5  #?????????????????????????????????????????????????????????
    @issue_attachments = @issue.attachments
  end

  def update
    last_token = @issue.token
    last_status_id = @issue.status_id
    @issue&.issue_tags_relates&.destroy_all if params[:issue_tag_ids].blank?
    if params[:issue_tag_ids].present? && !@issue&.issue_tags_relates.where(issue_tag_id: params[:issue_tag_ids]).exists?
      @issue&.issue_tags_relates&.destroy_all
      params[:issue_tag_ids].each do |tag|
        IssueTagsRelate.create(issue_id: @issue.id, issue_tag_id: tag)
      end
    end

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

    if @issue.issue_type.to_s == "2" &&  params[:status_id].to_i == 5 && @issue.author_id != current_user.try(:id)
      normal_status(-1, "??????????????????????????????")
    else
      issue_params = issue_send_params(params).except(:issue_classify, :author_id, :project_id)
      Issues::UpdateForm.new({subject:issue_params[:subject]}).validate!
      if @issue.update_attributes(issue_params)
        if @issue&.pull_request.present?
          SendTemplateMessageJob.perform_later('PullRequestChanged', current_user.id, @issue&.pull_request&.id, @issue.previous_changes.slice(:assigned_to_id, :priority_id, :fixed_version_id, :issue_tags_value)) if Site.has_notice_menu?
          SendTemplateMessageJob.perform_later('PullRequestAssigned', current_user.id, @issue&.pull_request&.id ) if @issue.previous_changes[:assigned_to_id].present? && Site.has_notice_menu?
        else
          previous_changes = @issue.previous_changes.slice(:status_id, :assigned_to_id, :tracker_id, :priority_id, :fixed_version_id, :done_ratio, :issue_tags_value, :branch_name)
          if @issue.previous_changes[:start_date].present? 
            previous_changes.merge!(start_date: [@issue.previous_changes[:start_date][0].to_s,  @issue.previous_changes[:start_date][1].to_s])
          end
          if @issue.previous_changes[:due_date].present? 
            previous_changes.merge!(due_date: [@issue.previous_changes[:due_date][0].to_s,  @issue.previous_changes[:due_date][1].to_s])
          end
          if @issue.previous_changes[:status_id].present? && @issue.previous_changes[:status_id][1] == 5
            @issue.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: ProjectTrend::CLOSE)
          end
          if @issue.previous_changes[:status_id].present? && @issue.previous_changes[:status_id][0] == 5
            @issue.project_trends.where(action_type: ProjectTrend::CLOSE).destroy_all
          end
          SendTemplateMessageJob.perform_later('IssueChanged', current_user.id, @issue&.id, previous_changes) if Site.has_notice_menu?
          SendTemplateMessageJob.perform_later('IssueAssigned', current_user.id, @issue&.id) if @issue.previous_changes[:assigned_to_id].present? && Site.has_notice_menu?
        end
        if params[:status_id].to_i == 5  #??????????????????????????????????????????
          @issue.issue_times.update_all(end_time: Time.now)
          @issue.update_closed_issues_count_in_project!
          if @issue.issue_type.to_s == "2" && last_status_id != 5
            if @issue.assigned_to_id.present? && last_status_id == 3 #?????????????????????100%????????????token
              post_to_chain("add", @issue.token, @issue.get_assign_user.try(:login))
            else
              post_to_chain("add", @issue.token, @issue.user.try(:login))
            end
          end
        end

        if @issue.issue_type.to_s == "2" && @issue.status_id != 5 && @issue.saved_change_to_attribute("token")
          #????????????token???
          change_token = last_token - @issue.token
          change_type = change_token > 0 ? "add" : "minus"
          post_to_chain(change_type, change_token.abs, current_user.try(:login))
        end
        @issue.create_journal_detail(change_files, issue_files, issue_file_ids, current_user&.id) if @issue.previous_changes.present? 

        Rails.logger.info "[ATME] maybe to at such users: #{@atme_receivers.pluck(:login)}"
        AtmeService.call(current_user, @atme_receivers, @issue) if @atme_receivers.size > 0

        normal_status(0, "????????????")
      else
        normal_status(-1, "????????????")
      end
    end
  rescue Exception => exception
    puts exception.message
    normal_status(-1, exception.message)
  end

  def show
    @user_permission = current_user.present? && current_user.logged? && (@project.member?(current_user) || current_user.admin? || @issue.user == current_user)
    @issue_attachments = @issue.attachments
    @issue_user = @issue.user
    @issue_assign_to = @issue.get_assign_user
    @join_users = join_users(@issue)
    #?????????
    # cost_time(@issue)

    # #?????????
    # @be_depended_issues_array = be_depended_issues(@issue)

    # #?????????
    # depended_issues(@issue)
  end

  def destroy
    begin
      issue_type = @issue.issue_type
      status_id = @issue.status_id
      token = @issue.token
      login =  @issue.user.try(:login)
      SendTemplateMessageJob.perform_later('IssueDeleted', current_user.id, @issue&.subject, @issue.assigned_to_id, @issue.author_id) if Site.has_notice_menu?
      if @issue.destroy
        if issue_type == "2" && status_id != 5
          post_to_chain("add", token, login)
        end
        normal_status(0, "????????????")
      else
        normal_status(-1, "????????????")
      end
    rescue => exception
      Rails.logger.info("#########_______exception.message_________##########{exception.message}")
      normal_status(-1, "????????????")
    else
    end

  end

  def clean
    #?????????????????????????????????????????????
    issue_ids = params[:ids]
    issues = Issue.where(id: issue_ids, issue_type: "1")
    if issues.present?
      issues.find_each do |i|
        SendTemplateMessageJob.perform_later('IssueDeleted', current_user.id, i&.subject, i.assigned_to_id, i.author_id) if Site.has_notice_menu?
      end
      if issues.destroy_all
        normal_status(0, "????????????")
      else
        normal_status(-1, "????????????")
      end
    else
      normal_status(-1, "???????????????")
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
      issues = Issue.where(id: issue_ids)
      if update_hash.blank?
        normal_status(-1, "???????????????????????????")
      elsif issues&.update(update_hash)
        issues.each do |i|
          i.create_journal_detail(false, [], [], current_user&.id) if i.previous_changes.present?
          previous_changes = i.previous_changes.slice(:status_id, :assigned_to_id, :tracker_id, :priority_id, :fixed_version_id, :done_ratio, :issue_tags_value, :branch_name)
          if i.previous_changes[:start_date].present? 
            previous_changes.merge!(start_date: [i.previous_changes[:start_date][0].to_s,  i.previous_changes[:start_date][1].to_s])
          end
          if i.previous_changes[:due_date].present? 
            previous_changes.merge!(due_date: [i.previous_changes[:due_date][0].to_s,  i.previous_changes[:due_date][1].to_s])
          end
          if i.previous_changes[:status_id].present? && i.previous_changes[:status_id][1] == 5
            i.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: ProjectTrend::CLOSE)
          end
          if i.previous_changes[:status_id].present? && i.previous_changes[:status_id][0] == 5
            i.project_trends.where(action_type: ProjectTrend::CLOSE).destroy_all
          end
          SendTemplateMessageJob.perform_later('IssueChanged', current_user.id, i&.id, previous_changes) if Site.has_notice_menu?
          SendTemplateMessageJob.perform_later('IssueAssigned', current_user.id, i&.id) if i.previous_changes[:assigned_to_id].present? && Site.has_notice_menu?
        end
        normal_status(0, "??????????????????")
      else
        normal_status(-1, "??????????????????")
      end
    else
      normal_status(-1, "???????????????")
    end
  end

  def copy
    @new_issue = @issue.dup
    @new_issue.author_id = current_user.id
    if @new_issue.save
      SendTemplateMessageJob.perform_later('IssueAssigned', current_user.id, @new_issue&.id) if Site.has_notice_menu?
      SendTemplateMessageJob.perform_later('ProjectIssue', current_user.id, @new_issue&.id) if Site.has_notice_menu?
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
      message = "??????"
      old_message = "????????????"
    else
      message = "????????????"
      old_message = "??????"
    end
    if @issue.update_attribute(:status_id, type)
      if type == 5
        @issue&.project_trends&.update_all(action_type: "close")
        @issue.issue_times.update_all(end_time: Time.now)
        if @issue.issue_type.to_s == "2"
          post_to_chain("add", @issue.token, @issue.get_assign_user.try(:login))
        end
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
      normal_status(-1, "????????????")
    end
  end

  def lock_issue
    if @issue.user == current_user || current_user.admin?
      type = (params[:lock_type].to_i == 1)
      if @issue.update_attribute(:is_lock, type)
        if type
          @issue.custom_journal_detail("lock_issue","", "??????#{params[:lock_reason].present? ? params[:lock_reason].to_s : "????????????"}??????????????????????????????????????????", current_user&.id)
        else
          @issue.custom_journal_detail("unlock_issue","", "????????????", current_user&.id)
        end
        normal_status(0, "????????????")
      else
        normal_status(-1, "????????????")
      end
    else
      normal_status(-1, "???????????????")
    end

  end

  private
  def set_user
    @user = @project&.owner
  end

  def check_project_public
    unless @project.is_public || @project.member?(current_user) || current_user.admin? || (@project.user_id == current_user.id)
      return render_forbidden
    end
  end

  def set_issue
    @issue = Issue.find_by_id(params[:id])
    if @issue.blank?
      return render_not_found
    elsif !(@project.is_public || (current_user.present? && (@project.member?(current_user) || current_user&.admin? || (@project.user_id == current_user&.id))))
      return render_forbidden
    end
  end

  def check_issue_permission
    unless @project.is_public || (current_user.present? && (@project.member?(current_user) || current_user&.admin? || (@project.user_id == current_user&.id)))
      return render_forbidden
    end
  end

  def operate_issue_permission
    return render_forbidden("??????????????????????????????.") unless current_user.present? && current_user.logged? && (current_user.admin? || @project.member?(current_user) || @project.is_public?)
  end

  def export_issues(issues)
    @table_columns = %w(ID ?????? ??????	??????	??????	?????????	????????? ?????? ????????? ???????????? ????????? ???????????? ???????????? ????????? ?????? ?????? ??????)
    @export_issues = []
    issues.each do |i|
      issue_array = [i.id, i.tracker.try(:name), i.subject, i.description, i.issue_status.try(:name),i.get_assign_user.try(:show_real_name),
                     i.priority.try(:name), i.get_issue_tags_name, i.user.try(:show_real_name), format_time(i.created_on), i.version.try(:name),
                     i.start_date.to_s, i.due_date.to_s, i.done_ratio.to_s + "%", i.issue_type == "2" ? "??????" : "??????", i.token.to_s, i.issue_classify]

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

  def post_to_chain(type, amount,login)
    change_params = {
      type: type,
      chain_params: {
        amount: amount,
        reponame: @project.try(:identifier),
        username: login
      }
    }
    PostChainJob.perform_later(change_params)
  end

  def check_token_enough
    if params[:issue_type].to_s == "2" && (@issue.blank? || (@issue.present? && @issue.author_id == current_user.try(:id)))
      return normal_status(-1, "???????????????????????????0") if params[:token].to_i == 0
      query_params = {
        type: "query",
        chain_params: {
          reponame: @project.try(:identifier),
          username: current_user.try(:login)
        }
      }
      response = Gitea::Chain::ChainGetService.new(query_params).call
      return normal_status(-1, "??????token????????????????????????") if response.status != 200
      return normal_status(-1, "??????token?????????") if JSON.parse(response.body)["balance"].to_i < params[:token].to_i
    end
  end

  def check_menu_authorize
    return render_not_found unless @project.has_menu_permission("issues")
  end
end
