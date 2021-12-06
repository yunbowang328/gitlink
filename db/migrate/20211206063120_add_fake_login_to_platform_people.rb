class AddFakeLoginToPlatformPeople < ActiveRecord::Migration[5.2]
  def change
    add_column :platform_people, :fake_login, :string
    remove_column :platform_people, :image_url
  end
end
