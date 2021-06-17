class Users::AppliedProjectsController < Users::BaseController 
  before_action :check_auth
  before_action :find_applied_project, except: [:index]
  before_action :find_project, except: [:index]

  def index 
    @applied_projects = AppliedProject.where(project_id: observed_user.full_admin_projects)
    @applied_projects = paginate @applied_projects.order("created_at desc")
  end

  # 接受申请
  def accept 
    @applied_project = Projects::AcceptJoinService.call(current_user, @applied_project)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  # 拒绝申请
  def refuse 
    @applied_project = Projects::RefuseJoinService.call(current_user, @applied_project)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 
  def check_auth 
    return render_forbidden unless current_user.admin? || observed_logged_user?
  end

  def find_applied_project 
    @applied_project = AppliedProject.find_by_id params[:id]
  end

  def find_project 
    @project = @applied_project.project
  end
end