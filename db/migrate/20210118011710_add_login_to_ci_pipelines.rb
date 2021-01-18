class AddLoginToCiPipelines < ActiveRecord::Migration[5.2]
  def change
    add_column :ci_pipelines, :login, :string
  end
end
