class AddFieldsToUserExtensions < ActiveRecord::Migration[5.2]
  def change
    add_column :user_extensions, :province, :string # 省份
    add_column :user_extensions, :city, :string   # 城市
    add_column :user_extensions, :custom_department, :string  #自己填写的单位名称
    # remove_column :users, :description
  end
end
