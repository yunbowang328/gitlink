namespace :refactor_project_trend do
  desc "refactor project trend data record"

  task issue_and_pull_request: :environment do
    puts "========DELETE all old data begin========"
    old_data_count = ProjectTrend.where(trend_type: ["PullRequest","Issue"]).destroy_all.size
    puts "========DELETE all old data #{old_data_count}========"
    puts "========DELETE all old data end========"
    puts "========CREATE new issue data begin========"
    issue_count = 0
    Issue.issue_issue.find_each do |issue|
      issue_count += 1
      issue.project_trends.create(user_id: issue.assigned_to_id || issue.author_id, project_id: issue.project_id, action_type: ProjectTrend::CLOSE, created_at: issue.updated_on) if issue.status_id == 5
      issue.project_trends.create(user_id: issue.author_id, project_id: issue.project_id, action_type: ProjectTrend::CREATE, created_at: issue.created_on)
    end
    puts "========CREATE new issue data #{issue_count}========"
    puts "========CREATE new issue data end========"
    puts "========CREATE new pull_request data begin========"
    pull_request_count = 0
    PullRequest.find_each do |pull_request|
      pull_request_count += 1
      pull_request.project_trends.create(user_id: pull_request.user_id, project_id: pull_request.project_id, action_type: ProjectTrend::MERGE, created_at: pull_request.updated_at) if pull_request.status == PullRequest::MERGED
      pull_request.project_trends.create(user_id: pull_request.user_id, project_id: pull_request.project_id, action_type: ProjectTrend::CLOSE, created_at: pull_request.updated_at) if pull_request.status == PullRequest::CLOSED
      pull_request.project_trends.create(user_id: pull_request.user_id, project_id: pull_request.project_id, action_type: ProjectTrend::CREATE, created_at: pull_request.created_at)
    end
    puts "========CREATE new pull_request data #{pull_request_count}========"
    puts "========CREATE new pull_request data end========"

  end
end