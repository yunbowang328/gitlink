class CreateOrganizationUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_users do |t|
      t.references :user
      t.references :organization

      t.timestamps
    end
  end
end
