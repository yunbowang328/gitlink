namespace :sync_count_cache do 
  desc "更新项目自动计数字段" 
  task projects: :environment do 
    Project.includes(:praise_treads, :fork_users, :issues, :watchers, :issues, :pull_requests, :versions, :issue_tags).find_each do |project|
      project.update(forked_count: project.fork_users.size, closed_issues_count: project.issues.where(status_id: 5).size)

      Project.reset_counters(project.id, :praise_treads)
      Project.reset_counters(project.id, :watchers)
      Project.reset_counters(project.id, :issues)
      Project.reset_counters(project.id, :pull_requests)
      Project.reset_counters(project.id, :versions)
      Project.reset_counters(project.id, :issue_tags)
    end
  end
end