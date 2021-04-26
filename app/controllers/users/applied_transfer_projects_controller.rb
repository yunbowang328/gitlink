class Users::AppliedTransferProjectsController < Users::BaseController 
  before_action :check_auth
  before_action :find_applied_transfer_project, except: [:index]
  before_action :find_project, except: [:index]

  def index 
    user_collection_sql = AppliedTransferProject.joins(project: [members: :roles]).where(members: {user_id: @_observed_user.id}, roles: {name: 'Manager'}).to_sql 
    org_collection_sql = AppliedTransferProject.where(owner_id: Organization.joins(team_users: :team).where(team_users: {user_id: @_observed_user.id}, teams: {authorize: %w(admin owner)} )).to_sql 
    @applied_transfer_projects = AppliedTransferProject.from("( #{ user_collection_sql } UNION #{ org_collection_sql } ) AS applied_transfer_projects")
    @applied_transfer_projects = paginate @applied_transfer_projects.order("created_at desc")
  end

  # 接受迁移
  def accept 
    @applied_transfer_project = Projects::AcceptTransferService.call(current_user, @project)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  # 拒绝迁移
  def refuse 
    @applied_transfer_project = Projects::RefuseTransferService.call(current_user, @project)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 
  def check_auth 
    return render_forbidden unless observed_logged_user?
  end

  def find_applied_transfer_project 
    @applied_transfer_project = AppliedTransferProject.find_by_id params[:id]
  end

  def find_project 
    @project = @applied_transfer_project.project
  end
end