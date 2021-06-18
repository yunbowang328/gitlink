class Admins::ProjectsController < Admins::BaseController

  def index
    sort_by = Project.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'created_on'
    sort_direction = %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
    search = params[:search].to_s.strip
    projects = Project.where("name like ?", "%#{search}%").order("#{sort_by} #{sort_direction}")
    @projects = paginate projects.includes(:owner, :members, :issues, :versions, :attachments, :project_score)
  end

  def destroy
    project = Project.find_by!(id: params[:id])
    ActiveRecord::Base.transaction do
      Gitea::Repository::DeleteService.new(project.owner, project.identifier).call
      project.destroy!
      # render_delete_success
      redirect_to admins_projects_path
      flash[:success] = "删除成功"
    end
    rescue Exception => e
      redirect_to admins_projects_path
      flash[:danger] = "删除失败"
  end
end