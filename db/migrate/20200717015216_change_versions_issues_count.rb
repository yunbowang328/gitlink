class ChangeVersionsIssuesCount < ActiveRecord::Migration[5.2]
  def change
    versions = Version.includes(:issues).select(:id, :closed_issues_count, :percent)
    versions.each do |v|
      closed_issues = Issue.select(:id, :fixed_version_id, :status_id).where(fixed_version_id: v.id, status_id: 5).size
      unless v.closed_issues_count.to_i == closed_issues
        puts v.id
        percent = v.issues_count.to_i <=0 ? 0.0 : (closed_issues.to_f / v.issues_count.to_i)
        v.closed_issues_count = closed_issues
        v.percent = percent
        v.save
      end
    end
  end
end
