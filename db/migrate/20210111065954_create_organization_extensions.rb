class CreateOrganizationExtensions < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_extensions do |t|
      t.references :organization
      t.string :description, comment: "组织描述"
      t.string :website, comment: "组织官方网站"
      t.string :location, comment: "组织地区"
      t.boolean :repo_admin_change_team_access, comment: "项目管理员是否可以添加或移除团队的访问权限", default: false
      t.integer :visibility, comment: "组织可见性", default: 0
      t.integer :max_repo_creation, comment: "组织最大仓库数", default: -1

      t.timestamps
    end
  end
end
