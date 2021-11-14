class DelayExpiredIssueJob < ApplicationJob
  queue_as :message

  def perform
    Issue.where(due_date: Date.today + 1.days).find_each do |issue|
      SendTemplateMessageJob.perform_later('IssueAssignerExpire', issue.id) if Site.has_notice_menu?
      SendTemplateMessageJob.perform_later('IssueCreatorExpire', issue.id) if Site.has_notice_menu?
    end
  end

end