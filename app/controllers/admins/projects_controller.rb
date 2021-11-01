class Admins::ProjectsController < Admins::BaseController
  before_action :find_project, only: [:edit, :update]

  def index
    sort_by = Project.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'created_on'
    sort_direction = %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
    search = params[:search].to_s.strip
    projects = Project.where("name like ?", "%#{search}%").order("#{sort_by} #{sort_direction}")
    @projects = paginate projects.includes(:owner, :members, :issues, :versions, :attachments, :project_score)
  end

  def edit ;end

  def update
    respond_to do |format|
      if @project.update_attributes(project_update_params)
        format.html do 
          redirect_to admins_projects_path
          flash[:sucess] = "更新成功"
        end
        format.js {render_ok}
      else 
        format.html do 
          redirect_to admins_projects_path
          flash[:danger] = "更新失败"
        end
        format.js {render_js_error}
      end
    end
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

  private 
  def find_project
    @project = Project.find_by_id(params[:id])
  end

  def project_update_params 
    params.require(:project).permit(:is_pinned, :recommend, :recommend_index)
  end
end