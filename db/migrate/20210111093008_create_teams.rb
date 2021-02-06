class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.references :organization
      t.string :name, comment: "团队名称"
      t.string :description, comment: "团队描述"
      t.integer :authorize, comment: "团队权限", default: 0
      t.integer :num_projects, comment: "团队项目数量", default: 0
      t.integer :num_users, comment: "团队成员数量", default: 0
      t.boolean :includes_all_project, comment: "团队是否拥有所有项目", default: false
      t.boolean :can_create_org_project, comment: "团队是否能创建项目", default: false
      t.integer :gtid, comment: "团队在gitea里的id"

      t.timestamps
    end
  end
end
