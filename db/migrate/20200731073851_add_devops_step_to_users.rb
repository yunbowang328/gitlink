class AddDevopsStepToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :devops_step, :integer, default: 0, comment: '0: uninit devops; 1: unverified; 2: verified'
  end
end
