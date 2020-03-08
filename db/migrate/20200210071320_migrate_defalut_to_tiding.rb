class MigrateDefalutToTiding < ActiveRecord::Migration[5.2]
  def change
    change_column_default :tidings, :status, from: nil, to: 0

    Tiding.where(status: nil).update_all(status: 0)
  end
end
