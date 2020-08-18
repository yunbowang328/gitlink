class CreateForkUsers < ActiveRecord::Migration[5.2]
  def change
    # create_table :fork_users do |t|
    #   t.integer :project_id  #原始项目id
    #   t.integer :fork_project_id  #fork后的项目id
    #   t.integer :user_id   #fork用户的id
    #   t.timestamps
    # end
    # add_index :fork_users, :project_id
    # add_index :fork_users, :user_id

    # projects = Project.where("forked_from_project_id is not null")
    # projects.each do |p|
    #   ForkUser.create(project_id: p.forked_from_project_id, fork_project_id: p.id, user_id: p.user_id)
    # end
  end
end
