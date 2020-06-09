class ChangeIssueToken < ActiveRecord::Migration[5.2]
  def change
    change_column :issues, :token, :integer, default: 0
  end
end
