# TODO 该字段用于trusite用户登录时，同步用户密码到gitea平台, 默认为未同步
class AddIsSyncPwdToUsers < ActiveRecord::Migration[5.2]
  def change
    # add_column :users, :is_sync_pwd, :boolean, :default => true
  end
end
