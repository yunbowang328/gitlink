class ChangeBranchNameTypeToSonarqube < ActiveRecord::Migration[5.2]
  def change
    change_column :sonarqubes, :branch_name, :string
  end
end
