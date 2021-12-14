class AtmeService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :receivers, :atmeable

  def initialize(user, receivers, atmeable)
    @user = user
    @receivers = receivers
    @atmeable = atmeable
  end

  def call
    Rails.logger.info "[ATME] service args: [user]=>#{user}, [receivers]=>#{receivers}, [atmeable]=>#{atmeable}"
    return if atmeable.nil?
    Rails.logger.info "[ATME] atmeable class name is:  #{ atmeable.class.name}"
    case atmeable.class.name
    when 'Issue'
      message_source = 'IssueAtme'
    when 'PullRequest'
      message_source = 'PullRequestAtme'
    when 'Journal'
      journal = Journal.find_by_id(atmeable.id)
      if journal.present?
        if journal&.issue&.pull_request.present?
          @atmeable = journal&.issue&.pull_request
          message_source = 'PullRequestAtme'
        else
          @atmeable = journal&.issue
          message_source = 'IssueAtme'
        end
      end
    else 
      return 
    end
    SendTemplateMessageJob.perform_later(message_source, receivers.pluck(:id), user.id, @atmeable.id) if Site.has_notice_menu?
  end
end
