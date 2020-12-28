class AddSomeColumnsAboutApplySignatures < ActiveRecord::Migration[5.2]
  def change
    add_column :licenses, :is_secret, :boolean, default: false
    add_column :members, :is_apply_signature, :boolean, default: false
  end
end
