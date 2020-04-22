# 执行示例  bundle exec rake sync_version_issues:update_issues
# 线上环境执行示例  RAILS_ENV=production bundle exec rake sync_version_issues:update_issues

namespace :sync_version_issues do
  desc "update version issues_count"

  task update_issues: :environment do
    versions = Version.all
    puts "____________sync start________________"

    versions.find_each do |q|
      issues = Issue.select(:id, :fixed_version_id,:status_id).where(fixed_version_id: q.id)
      issues_count = issues.size
      puts "____________issues_count____________#{issues_count}____"
      closed_issues_count = issues.where(status_id: 5).size
      percent = issues_count == 0 ? 0.0 : (closed_issues_count.to_f / issues_count)
      q.update_attributes(issues_count: issues_count, closed_issues_count: closed_issues_count, percent: percent)
      puts "____________sync success________________"
    end
    puts "____________sync end________________"
  end

end