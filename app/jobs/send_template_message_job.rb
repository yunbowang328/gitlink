class SendTemplateMessageJob < ApplicationJob
  queue_as :message

  def perform(source, *args)
    Rails.logger.info "SendTemplateMessageJob [args] #{args}"
    case source 
    when 'FollowTip'
      watcher_id = args[0]
      watcher = Watcher.find_by_id(watcher_id)
      return unless watcher.present?
      receivers = User.where(id: watcher.watchable_id)
      followeder = User.find_by_id(watcher.user_id)
      receivers_string, content, notification_url = MessageTemplate::FollowedTip.get_message_content(receivers, followeder)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {watcher_id: watcher.id})
    when 'IssueAssigned'
      operator_id, issue_id = args[0], args[1] 
      operator = User.find_by_id(operator_id)
      issue = Issue.find_by_id(issue_id)
      return unless operator.present? && issue.present?
      receivers = User.where(id: issue&.assigned_to_id).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::IssueAssigned.get_message_content(receivers, operator, issue)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, issue_id: issue.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::IssueAssigned.get_email_message_content(receiver, operator, issue)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'IssueAssignerExpire'
      issue_id = args[0]
      issue = Issue.find_by_id(issue_id)
      return unless issue.present?
      receivers = User.where(id: issue&.assigned_to_id)
      receivers_string, content, notification_url = MessageTemplate::IssueAssignerExpire.get_message_content(receivers, issue)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {issue_id: issue.id})
    when 'IssueAtme'
      receivers, operator_id, issue_id = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      issue = Issue.find_by_id(issue_id)
      return unless operator.present? && issue.present?
      # receivers = receivers.where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::IssueAtme.get_message_content(receivers, operator, issue)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, issue_id: issue.id}, 2)
    when 'IssueChanged'
      operator_id, issue_id, change_params = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      issue = Issue.find_by_id(issue_id)
      return unless operator.present? && issue.present?
      receivers = User.where(id: [issue&.assigned_to_id, issue&.author_id]).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::IssueChanged.get_message_content(receivers, operator, issue, change_params.symbolize_keys)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, issue_id: issue.id, change_params: change_params.symbolize_keys})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::IssueChanged.get_email_message_content(receiver, operator, issue, change_params)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'IssueCreatorExpire'
      issue_id = args[0]
      issue = Issue.find_by_id(issue_id)
      return unless issue.present?
      receivers = User.where(id: issue&.author_id)
      receivers_string, content, notification_url = MessageTemplate::IssueCreatorExpire.get_message_content(receivers, issue)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {issue_id: issue.id})
    when 'IssueDeleted'
      operator_id, issue_title, issue_assigned_to_id, issue_author_id = args[0], args[1], args[2], args[3]
      operator = User.find_by_id(operator_id)
      return unless operator.present?
      receivers = User.where(id: [issue_assigned_to_id, issue_author_id]).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::IssueDeleted.get_message_content(receivers, operator, issue_title)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, issue_title: issue_title})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::IssueDeleted.get_email_message_content(receiver, operator, issue_title)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'OrganizationJoined'
      user_id, organization_id = args[0], args[1]
      user = User.find_by_id(user_id)
      organization = Organization.find_by_id(organization_id)
      return unless user.present? && organization.present?
      receivers = User.where(id: user.id)
      receivers_string, content, notification_url = MessageTemplate::OrganizationJoined.get_message_content(receivers, organization)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {user_id: user.id, organization_id: organization.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::OrganizationJoined.get_email_message_content(receiver, organization)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'OrganizationLeft'
      user_id, organization_id = args[0], args[1]
      user = User.find_by_id(user_id)
      organization = Organization.find_by_id(organization_id)
      return unless user.present? && organization.present?
      receivers = User.where(id: user.id)
      receivers_string, content, notification_url = MessageTemplate::OrganizationLeft.get_message_content(receivers, organization)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {user_id: user.id, organization_id: organization.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::OrganizationLeft.get_email_message_content(receiver, organization)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'OrganizationRole'
      user_id, organization_id, role = args[0], args[1], args[2]
      user = User.find_by_id(user_id)
      organization = Organization.find_by_id(organization_id)
      return unless user.present? && organization.present?
      receivers = User.where(id: user.id)
      receivers_string, content, notification_url = MessageTemplate::OrganizationRole.get_message_content(receivers, organization, role)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {user_id: user.id, organization_id: organization.id, role: role})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::OrganizationRole.get_email_message_content(receiver, organization, role)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'ProjectIssue'
      operator_id, issue_id = args[0], args[1]
      operator = User.find_by_id(operator_id)
      issue = Issue.find_by_id(issue_id)
      return unless operator.present? && issue.present? && issue&.project.present?
      managers = issue&.project&.all_managers.where.not(id: operator&.id)
      followers = User.none # TODO 
      receivers_string, content, notification_url = MessageTemplate::ProjectIssue.get_message_content(managers, followers, operator, issue)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, issue_id: issue.id})
      managers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectIssue.get_email_message_content(receiver, true, operator, issue)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
      followers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectIssue.get_email_message_content(receiver, false, operator, issue)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'ProjectJoined'
      operator_id, user_id, project_id = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      user = User.find_by_id(user_id)
      project = Project.find_by_id(project_id)
      return unless operator.present? && user.present? && project.present?
      receivers = User.where(id: user.id).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::ProjectJoined.get_message_content(receivers, project)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, user_id: user.id, project_id: project.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectJoined.get_email_message_content(receiver, project)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'ProjectLeft'
      operator_id, user_id, project_id = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      user = User.find_by_id(user_id)
      project = Project.find_by_id(project_id)
      return unless operator.present? && user.present? && project.present?
      receivers = User.where(id: user.id).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::ProjectLeft.get_message_content(receivers, project)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, user_id: user.id, project_id: project.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectLeft.get_email_message_content(receiver, project)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'ProjectMemberJoined'
      operator_id, user_id, project_id = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      user = User.find_by_id(user_id)
      project = Project.find_by_id(project_id)
      return unless operator.present? && user.present? && project.present?
      receivers = project&.all_managers.where.not(id: [operator&.id, user&.id])
      receivers_string, content, notification_url = MessageTemplate::ProjectMemberJoined.get_message_content(receivers, user, project)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, user_id: user.id, project_id: project.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectMemberJoined.get_email_message_content(receiver, user, project)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'ProjectMemberLeft'
      operator_id, user_id, project_id = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      user = User.find_by_id(user_id)
      project = Project.find_by_id(project_id)
      return unless operator.present? && user.present? && project.present?
      receivers = project&.all_managers.where.not(id: [operator&.id, user&.id])
      receivers_string, content, notification_url = MessageTemplate::ProjectMemberLeft.get_message_content(receivers, user, project)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, user_id: user.id, project_id: project.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectMemberLeft.get_email_message_content(receiver, user, project)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'ProjectPullRequest'
      operator_id, pull_request_id = args[0], args[1]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      return unless operator.present? && pull_request.present? && pull_request&.project.present?
      managers = pull_request&.project&.all_managers.where.not(id: operator&.id)
      followers = User.none # TODO 
      receivers_string, content, notification_url = MessageTemplate::ProjectPullRequest.get_message_content(managers, followers, operator, pull_request)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id})
      managers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectPullRequest.get_email_message_content(receiver, true, operator, pull_request)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
      followers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectPullRequest.get_email_message_content(receiver, false, operator, pull_request)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'ProjectRole'
      operator_id, user_id, project_id, role = args[0], args[1], args[2], args[3]
      operator = User.find_by_id(operator_id)
      user = User.find_by_id(user_id)
      project = Project.find_by_id(project_id)
      return unless operator.present? && user.present? && project.present?
      receivers = User.where(id: user.id).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::ProjectRole.get_message_content(receivers, project, role)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, user_id: user.id, project_id: project.id, role: role})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectRole.get_email_message_content(receiver, project, role)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'ProjectSettingChanged'
      operator_id, project_id, change_params = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      project = Project.find_by_id(project_id)
      return unless operator.present? && project.present?
      receivers = project.all_managers.where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::ProjectSettingChanged.get_message_content(receivers, operator, project, change_params.symbolize_keys)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, project_id: project.id, change_params: change_params.symbolize_keys})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::ProjectSettingChanged.get_email_message_content(receiver, operator, project, change_params.symbolize_keys)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'PullRequestAssigned'
      operator_id, pull_request_id = args[0], args[1]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      issue = Issue.find_by_id(pull_request&.issue_id)
      return unless operator.present? && pull_request.present? && issue.present?
      receivers = User.where(id: issue&.assigned_to_id).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::PullRequestAssigned.get_message_content(receivers, operator, pull_request)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::PullRequestAssigned.get_email_message_content(receiver, operator, pull_request)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'PullRequestAtme'
      receivers, operator_id, pull_request_id = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      return unless operator.present? && pull_request.present?
      # receivers = receivers.where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::PullRequestAtme.get_message_content(receivers, operator, pull_request)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id}, 2)
    when 'PullRequestChanged'
      operator_id, pull_request_id, change_params = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      issue = Issue.find_by_id(pull_request&.issue_id)
      return unless operator.present? && pull_request.present? && issue.present?
      receivers = User.where(id: [issue&.assigned_to_id, pull_request&.user_id]).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::PullRequestChanged.get_message_content(receivers, operator, pull_request, change_params.symbolize_keys)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id, change_params: change_params})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::PullRequestChanged.get_email_message_content(receiver, operator, pull_request, change_params.symbolize_keys)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'PullRequestClosed'
      operator_id, pull_request_id = args[0], args[1]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      return unless operator.present? && pull_request.present?
      receivers = User.where(id: [pull_request&.issue&.assigned_to_id, pull_request&.user_id]).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::PullRequestClosed.get_message_content(receivers, operator, pull_request)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::PullRequestClosed.get_email_message_content(receiver, operator, pull_request)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    when 'PullRequestMerged'
      operator_id, pull_request_id = args[0], args[1]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      return unless operator.present? && pull_request.present?
      receivers = User.where(id: [pull_request&.issue&.assigned_to_id, pull_request&.user_id]).where.not(id: operator&.id)
      receivers_string, content, notification_url = MessageTemplate::PullRequestMerged.get_message_content(receivers, operator, pull_request)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id})
      receivers.find_each do |receiver|
        receivers_email_string, email_title, email_content = MessageTemplate::PullRequestMerged.get_email_message_content(receiver, operator, pull_request)
        Notice::Write::EmailCreateService.call(receivers_email_string, email_title, email_content)
      end
    end
  end
end