class AddOpenDevopsCountToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :open_devops_count, :integer, default: 0, comment: '针对同一台ci服务器激活devops流程的次数'
  end
end
