class AddSyncAndProjectIdToCiPipelines < ActiveRecord::Migration[5.2]
  def change
    add_column :ci_pipelines, :sync, :integer, null: false, comment: '0 未同步到gitea，1 已同步', default: 0
    add_column :ci_pipelines, :project_id, :integer
  end
end