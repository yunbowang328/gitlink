class ChangeIssuesPriorityIdDefault < ActiveRecord::Migration[5.2]
  def change
    change_column_null :issues, :priority_id, true
  end
end
