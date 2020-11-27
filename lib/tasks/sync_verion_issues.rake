# 执行示例  bundle exec rake sync_version_issues:update_issues
# 线上环境执行示例  RAILS_ENV=production bundle exec rake sync_version_issues:update_issues

namespace :sync_version_issues do
  desc "update version issues_count"

  task update_issues: :environment do
    puts "____________sync start________________"

    Version.all.each do |q|
      puts "______########{q.id}"
      issues = Issue.select(:id, :fixed_version_id,:status_id).where(fixed_version_id: q.id)
      issues_count = issues.size
      closed_issues_count = issues.where(status_id: 5).size
      percent = issues_count == 0 ? 0.0 : (closed_issues_count.to_f / issues_count)

      begin
        q.update!(closed_issues_count: closed_issues_count, percent: percent)
        Version.update_counters q.id,issues_count: issues_count
        puts "____issues_count__########{q.issues_count}"
      rescue Exception => e
        puts "#####_______save_error______######{e}"
      end
    end
    puts "____________sync end________________"
  end

end