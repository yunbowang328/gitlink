class DelayExpiredIssueJob < ApplicationJob
  queue_as :message

  def perform
    Issue.where(due_date: Date.today + 1.days).find_each do |issue|
      SendTemplateMessageJob.perform_later('IssueAssignerExpire', issue.id)
      SendTemplateMessageJob.perform_later('IssueCreatorExpire', issue.id)
    end
  end

end