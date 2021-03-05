class Admins::ProjectsController < Admins::BaseController
  before_action :load_project, only: [:sync_phenglei_user]

  def index
    sort_by = params[:sort_by] ||= 'created_on'
    sort_direction = params[:sort_direction] ||= 'desc'

    search = params[:search].to_s.strip
    projects = Project.where("name like ?", "%#{search}%").order("#{sort_by} #{sort_direction}")
    @projects = paginate projects.includes(:owner, :members, :issues, :versions, :attachments, :project_score, :license)
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

  def sync_phenglei_user
    if @project.is_secret
      SyncPhengleiUserJob.perform_later(@project.id)
      redirect_to admins_projects_path
      flash[:success] = "已开启后台同步任务"
    else
      redirect_to admins_projects_path
      flash[:danger] = "非风雷协议项目"
    end
  end

  private
  def load_project
    @project = Project.find_by!(id: params[:id])
  end
end