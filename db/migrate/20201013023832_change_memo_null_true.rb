class ChangeMemoNullTrue < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:memos, :forum_id, true)
  end
end
