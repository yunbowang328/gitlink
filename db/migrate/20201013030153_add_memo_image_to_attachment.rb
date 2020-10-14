class AddMemoImageToAttachment < ActiveRecord::Migration[5.2]
  def change
    add_column :attachments, :memo_image, :boolean, default: false  
    add_column :attachments, :extra_type, :integer, default: 0
  end
end
