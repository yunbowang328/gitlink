class ComposeProjectsController < ApplicationController
  #未做完
  before_action :require_login
  before_action :set_compose

  def create
    project_ids = params[:project_ids]
    ComposeProject.transaction do
      project_ids.each do |p|
        project = Project.select(:id, :user_id).find(p)
        unless project.blank? || ComposeProject.exists?(user_id: project.user_id, project_id: p, compose_id: @compose.id)
          ComposeProject.create!(user_id: project.user_id, project_id: p, compose_id: @compose.id, position: p)
        end
      end
    end
    normal_status(0, "添加成功")
  end

  def destroy
    project_ids = params[:project_ids]
    if ComposeProject.where(project_id: project_ids, compose_id: @compose.id).delete_all
      normal_status(0, "项目删除成功")
    else
      normal_status(-1, "项目删除失败")
    end
  end


  private

  def set_compose
    @compose = Compose.find(params[:compose_id])
    unless @compose.present?
      normal_status(-1, "组织不存在")
    end
  end

end