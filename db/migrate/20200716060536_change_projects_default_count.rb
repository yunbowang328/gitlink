class ChangeProjectsDefaultCount < ActiveRecord::Migration[5.2]
  def change
    projects = Project.select(:id, :issues_count,:pull_requests_count,:versions_count,:praises_count,:watchers_count).all
    projects.each do |p|
      puts p.id
      Project.reset_counters( p.id, :issues_count, touch: false )
      Project.reset_counters( p.id, :pull_requests_count, touch: false )
      Project.reset_counters( p.id, :versions_count, touch: false )
      # Project.reset_counters( p.id, :praises_count, touch: false )
      Project.reset_counters( p.id, :watchers_count, touch: false )
    end
  end
end
