class Admins::ProjectsController < Admins::BaseController

  def index
    sort_by = params[:sort_by] ||= 'created_on'
    sort_direction = params[:sort_direction] ||= 'desc'

    search = params[:search].to_s.strip
    projects = Project.where("name like ?", "%#{search}%").order("#{sort_by} #{sort_direction}")
    @projects = paginate projects.includes(:owner, :members, :issues, :versions, :attachments, :project_score)
  end

  def destroy
    project = Project.find_by!(id: params[:id])
    ActiveRecord::Base.transaction do
      g = Gitlab.client
      g.delete_project(project.gpid)
      # 删除Trustie版本库记录
      repoisitory = Repository.where(project_id: project.id, type: "Repository::Gitlab").first
      repoisitory.destroy!
      Tiding.where(container_id: project.id, container_type: ["JoinProject", "DealProject", "ReporterJoinProject", "ManagerJoinProject"]).destroy_all
      project.destroy!
      render_delete_success
    end
  end
end