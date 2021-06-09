class AddTimestampToAppliedProjects < ActiveRecord::Migration[5.2]
  def change
    add_timestamps(:applied_projects, null: true)
  end
end
