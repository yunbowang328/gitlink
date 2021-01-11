class CreateOrganizationUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_users do |t|
      t.references :user
      t.references :organization
      t.boolean :is_creator, comment: "是否为创建者", default: false

      t.timestamps
    end
  end
end
