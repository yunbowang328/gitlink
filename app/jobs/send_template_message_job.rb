class SendTemplateMessageJob < ApplicationJob
  queue_as :default

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
      receivers = User.where(id: issue&.assigned_to_id)
      receivers_string, content, notification_url = MessageTemplate::IssueAssigned.get_message_content(receivers, operator, issue)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, issue_id: issue.id})
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
      receivers_string, content, notification_url = MessageTemplate::IssueAtme.get_message_content(receivers, operator, issue)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, issue_id: issue.id}, 2)
    when 'IssueChanged'
      operator_id, issue_id, change_params = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      issue = Issue.find_by_id(issue_id)
      return unless operator.present? && issue.present?
      receivers = User.where(id: [issue&.assigned_to_id, issue&.author_id])
      receivers_string, content, notification_url = MessageTemplate::IssueChanged.get_message_content(receivers, operator, issue, change_params)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, issue_id: issue.id, change_params: change_params.symbolize_keys})
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
      receivers = User.where(id: [issue_assigned_to_id, issue_author_id])
      receivers_string, content, notification_url = MessageTemplate::IssueDeleted.get_message_content(receivers, operator, issue_title)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, issue_title: issue_title})
    when 'OrganizationJoined'
      user_id, organization_id = args[0], args[1]
      user = User.find_by_id(user_id)
      organization = Organization.find_by_id(organization_id)
      return unless user.present? && organization.present?
      receivers = User.where(id: user.id)
      receivers_string, content, notification_url = MessageTemplate::OrganizationJoined.get_message_content(receivers, organization)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {user_id: user.id, organization_id: organization.id})
    when 'OrganizationLeft'
      user_id, organization_id = args[0], args[1]
      user = User.find_by_id(user_id)
      organization = Organization.find_by_id(organization_id)
      return unless user.present? && organization.present?
      receivers = User.where(id: user.id)
      receivers_string, content, notification_url = MessageTemplate::OrganizationLeft.get_message_content(receivers, organization)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {user_id: user.id, organization_id: organization.id})
    when 'OrganizationRole'
      user_id, organization_id, role = args[0], args[1], args[2]
      user = User.find_by_id(user_id)
      organization = Organization.find_by_id(organization_id)
      return unless user.present? && organization.present?
      receivers = User.where(id: user.id)
      receivers_string, content, notification_url = MessageTemplate::OrganizationRole.get_message_content(receivers, organization, role)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {user_id: user.id, organization_id: organization.id, role: role})
    when 'ProjectJoined'
      user_id, project_id = args[0], args[1]
      user = User.find_by_id(user_id)
      project = Project.find_by_id(project_id)
      return unless user.present? && project.present?
      receivers = User.where(id: user.user_id)
      receivers_string, content, notification_url = MessageTemplate::ProjectJoined.get_message_content(receivers, project)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {user_id: user.id, project_id: project.id})
    when 'ProjectLeft'
      user_id, project_id = args[0], args[1]
      user = User.find_by_id(user_id)
      project = Project.find_by_id(project_id)
      return unless user.present? && project.present?
      receivers = User.where(id: user.user_id)
      receivers_string, content, notification_url = MessageTemplate::ProjectJoined.get_message_content(receivers, project)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {user_id: user.id, project_id: project.id})
    when 'ProjectRole'
      user_id, project_id, role = args[0], args[1], args[2]
      user = User.find_by_id(user_id)
      project = Project.find_by_id(project_id)
      return unless user.present? && project.present?
      receivers = User.where(id: user.user_id)
      receivers_string, content, notification_url = MessageTemplate::ProjectRole.get_message_content(receivers, project, role)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {user_id: user.id, project_id: project.id, role: role})
    when 'ProjectSettingChanged'
      operator_id, project_id, change_params = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      project = Project.find_by_id(project_id)
      return unless operator.present? && project.present?
      receivers = project.all_managers
      receivers_string, content, notification_url = MessageTemplate::ProjectSettingChanged.get_message_content(receivers, operator, project, change_params.symbolize_keys)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, project_id: project.id, change_params: change_params})
    when 'PullRequestAssigned'
      operator_id, pull_request_id = args[0], args[1]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      return unless operator.present? && pull_request.present?
      receivers = User.where(id: pull_request&.issue&.assigned_to_id)
      receivers_string, content, notification_url = MessageTemplate::PullRequestAssigned.get_message_content(receivers, operator, pull_request)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id})
    when 'PullRequestAtme'
      receivers, operator_id, pull_request_id = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      return unless operator.present? && pull_request.present?
      receivers_string, content, notification_url = MessageTemplate::PullRequestAtme.get_message_content(receivers, operator, pull_request)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id}, 2)
    when 'PullRequestChanged'
      operator_id, pull_request_id, change_params = args[0], args[1], args[2]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      return unless operator.present? && pull_request.present?
      receivers = User.where(id: [pull_request&.issue&.assigned_to_id, pull_request&.user_id])
      receivers_string, content, notification_url = MessageTemplate::PullRequestChanged.get_message_content(receivers, operator, pull_request, change_params.symbolize_keys)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id, change_params: change_params})
    when 'PullRequestClosed'
      operator_id, pull_request_id = args[0], args[1]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      return unless operator.present? && pull_request.present?
      receivers = User.where(id: [pull_request&.issue&.assigned_to_id, pull_request&.user_id])
      receivers_string, content, notification_url = MessageTemplate::PullRequestClosed.get_message_content(receivers, operator, pull_request)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id})
    when 'PullRequestMerged'
      operator_id, pull_request_id = args[0], args[1]
      operator = User.find_by_id(operator_id)
      pull_request = PullRequest.find_by_id(pull_request_id)
      return unless operator.present? && pull_request.present?
      receivers = User.where(id: [pull_request&.issue&.assigned_to_id, pull_request&.user_id])
      receivers_string, content, notification_url = MessageTemplate::PullRequestMerged.get_message_content(receivers, operator, pull_request)
      Notice::Write::CreateService.call(receivers_string, content, notification_url, source, {operator_id: operator.id, pull_request_id: pull_request.id})
    end
  end
end