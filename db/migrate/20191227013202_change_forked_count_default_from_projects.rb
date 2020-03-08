class ChangeForkedCountDefaultFromProjects < ActiveRecord::Migration[5.2]
  def change
    change_column_default :projects, :forked_count, { from: nil, to: 0 }
    change_column_default :projects, :project_type, { from: nil, to: 0 }

    Project.find_each do |project|
      project.update_column('forked_count', 0) if project.forked_count.nil?
      project.update_column('project_type', 0) if project.project_type.nil?
    end
  end
end
