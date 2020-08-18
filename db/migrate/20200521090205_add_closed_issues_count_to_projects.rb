class AddClosedIssuesCountToProjects < ActiveRecord::Migration[5.2]
  def change
    # add_column :projects, :closed_issues_count, :integer, default: 0

    # projects = Project.joins(:issues).where('status_id = 5').select("projects.id, count('issues.id')  as closed_issues_count").group("projects.id")
    # projects.each do |pro|
    #   project = Project.find pro.id
    #   project.update_column(:closed_issues_count, pro.closed_issues_count) if project.closed_issues_count == 0
    # end
  end
end
