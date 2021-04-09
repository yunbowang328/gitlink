class AddUserRefToRepository < ActiveRecord::Migration[5.2]
  def change
    add_column :repositories, :user_id, :integer
    add_index :repositories, :user_id

    Project.joins(:repository).find_each do |project|
      project&.repository&.update_column(:user_id, project&.user_id) unless project&.repository.blank?
    end
  end
end
