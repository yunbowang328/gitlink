class CreateApiKeys < ActiveRecord::Migration[5.2]
  def change
    if ActiveRecord::Base.connection.tables.include?('api_keys')
      drop_table :api_keys
    end
    create_table :api_keys do |t|
      t.string   "access_token"
      t.datetime "expires_at"
      t.integer  "user_id"
      t.boolean  "active",       :default => true      
      t.timestamps
    end
  end
end
