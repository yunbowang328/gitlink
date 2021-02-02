class AddBranchAndEventAndShaToCiPipelines < ActiveRecord::Migration[5.2]
  def change
    add_column :ci_pipelines, :branch, :string
    add_column :ci_pipelines, :event, :string
    add_column :ci_pipelines, :sha, :string
  end
end
