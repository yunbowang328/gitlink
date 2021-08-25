class OwnersController < ApplicationController
  before_action :require_login, only: [:index]

  def index
    @owners = []
    @owners += [current_user]
    @owners += Organization.joins(team_users: :team)
                   .where(team_users: {user_id: current_user.id},
                          teams: {can_create_org_project: true})
                   .distinct
  end

  def show 
    @owner = Owner.find_by(login: params[:id]) || Owner.find_by(id: params[:id])
    # 组织
    if @owner.is_a?(Organization)
      @can_create_project = @owner.can_create_project?(current_user.id)
      @is_admin = current_user.admin? || @owner.is_owner?(current_user.id)
      @is_member = @owner.is_member?(current_user.id)
    # 用户
    else 
      #待办事项，现在未做
      if User.current.admin? || User.current.login == @owner.login 
        @waiting_applied_messages = @owner.applied_messages.waiting
        @common_applied_transfer_projects = AppliedTransferProject.where(owner_id: @owner.id).common + AppliedTransferProject.where(owner_id: Organization.joins(team_users: :team).where(team_users: {user_id: @owner.id}, teams: {authorize: %w(admin owner)} )).common
        @common_applied_projects = AppliedProject.where(project_id: @owner.full_admin_projects).common
        @undo_events = @waiting_applied_messages.size + @common_applied_transfer_projects.size + @common_applied_projects.size
      else 
        @waiting_applied_messages = AppliedMessage.none
        @common_applied_transfer_projects = AppliedTransferProject.none
        @common_applied_projects = AppliedProject.none
        @undo_events = 0
      end
      #用户的组织数量
      # @user_composes_count =  @user.composes.size
      @user_composes_count = 0
      user_organizations =  User.current.logged? ? @owner.organizations.with_visibility(%w(common limited)) + @owner.organizations.with_visibility("privacy").joins(:team_users).where(team_users: {user_id: current_user.id}) : @owner.organizations.with_visibility("common")
      @user_org_count = user_organizations.size
      normal_projects = Project.members_projects(@owner.id).to_sql
      org_projects = Project.joins(team_projects: [team: :team_users]).where(team_users: {user_id: @owner.id}).to_sql
      projects = Project.from("( #{ normal_projects} UNION #{ org_projects } ) AS projects").distinct
      user_projects = User.current.logged? && (User.current.admin? ||  User.current.login == @owner.login) ? projects : projects.visible
      @projects_common_count = user_projects.common.size
      @projects_mirrior_count = user_projects.mirror.size
      @projects_sync_mirrior_count = user_projects.sync_mirror.size
      puts @owner.as_json
    end
  end

end