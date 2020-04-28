class IssueTimesController < ApplicationController
  before_action :require_login
  before_action :set_issue
  before_action :check_issue_permission

  def create
    issue_time = {
      user_id: current_user.id,
      start_time: params[:start_time].to_s.to_time || Time.now,
      issue_id: @issue.id
    }
    save_issue_time = IssueTime.new(issue_time)
    if save_issue_time.save
      @issue.custom_journal_detail("work_time",save_issue_time.id, "开始工作", current_user&.id)
      normal_status(0, "开始成功")
    else
      normal_status(0, "开始失败")
    end
  end

  def end_work
    end_type = params[:end_type].to_i
    end_work_time = end_type == 0 ? "" : Time.now
    last_work_time = @issue.issue_times.where(user_id: current_user.id, end_time: nil)
    Rails.logger.info("######________last_work_time&.last.try(:id)_____###########{last_work_time&.first.try(:id)}")

    if last_work_time.update_all(end_time: end_work_time)
      if end_type == 0
        message = "取消时间跟踪"
        @issue.custom_journal_detail("cancel_time",last_work_time&.first.try(:id), "取消时间跟踪", current_user&.id)
      else
        message = "停止工作"
        @issue.custom_journal_detail("end_time",last_work_time&.first.try(:id), "停止工作", current_user&.id)
      end
      normal_status(0, message)
    else
      normal_status(0, "操作失败")
    end
  end

  private
  def set_issue
    @issue = Issue.find_by_id(params[:issue_id])
    unless @issue.present?
      normal_status(-1, "标签不存在")
    end
  end

  def check_issue_permission
    @project = @issue.project
    unless @project.member?(current_user) || current_user.admin?
      normal_status(-1, "您没有权限")
    end
  end
end
