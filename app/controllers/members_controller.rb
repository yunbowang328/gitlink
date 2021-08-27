class MembersController < ApplicationController
  before_action :require_login
  before_action :load_project
  before_action :find_user_with_id, only: %i[create remove change_role]
  before_action :operate!, except: %i[index]
  before_action :check_member_exists!, only: %i[create]
  before_action :check_member_not_exists!, only: %i[remove change_role]

  def create
    if @user.gitea_token.blank?
      result = Gitea::User::GetService.call(@user.login)
      if result[:status] == :error
        # gitea不存在用户@user,直接注册
        user_result = create_gitea_user!(@user, @user.login, @user.mail)
        return render_error(user_result[:message]) if user_result[:message]
      end
    end
    interactor = Projects::AddMemberInteractor.call(@project.owner, @project, @user)
    
    render_response(interactor)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def index
    scope = @project.members.includes(:roles, user: :user_extension)
    search = params[:search].to_s.downcase
    role = params[:role].to_s
    scope = scope.joins(:user).merge(User.like(search))
    scope = scope.joins(:roles).where("roles.name LIKE ?", "%#{role}%") if role.present?

    @total_count = scope.size
    @members = paginate(scope)
  end

  def remove
    interactor = Projects::DeleteMemberInteractor.call(@project.owner, @project, @user)
    render_response(interactor)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def change_role
    interactor = Projects::ChangeMemberRoleInteractor.call(@project.owner, @project, @user, params[:role])
    render_response(interactor)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private
  def can_operate?
    current_user.project_manager?(@project)
  end

  def member_exists?
    @project.members.exists?(user_id: params[:user_id])
  end

  def operate!
    return render_forbidden('你不是管理员，没有权限操作') unless can_operate?
  end

  def check_member_exists!
    return render_error("user_id为#{params[:user_id]}的用户已经是项目成员") if member_exists?
  end

  def check_member_not_exists!
    return render_error("user_id为#{params[:user_id]}的用户还不是项目成员") unless member_exists?
  end
end
