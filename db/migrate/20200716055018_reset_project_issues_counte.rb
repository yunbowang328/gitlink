class ResetProjectIssuesCounte < ActiveRecord::Migration[5.2]
  def change
    projects = Project.select(:id, :issues_count).all
    projects.each do |p|
      puts p.id
      Project.reset_counters( p.id, :issues_count, touch: false )
    end
  end
end
