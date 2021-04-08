class AddOwnerToCiPipelines < ActiveRecord::Migration[5.2]
  def change
    add_column :ci_pipelines, :owner, :string
  end
end
