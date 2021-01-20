class Organizations::TeamProjectsController < Organizations::BaseController
  before_action :load_organization
  before_action :load_team
  before_action :load_operate_project, :check_user_can_edit_org, only: [:create, :destroy]
  before_action :load_team_project, only: [:destroy]

  def index
    @team_projects = @team.team_projects

    @team_projects = paginate(@team_projects)
  end

  def create
    tip_exception("该组织团队项目包括组织所有项目,不允许更改") if @team.includes_all_project
    ActiveRecord::Base.transaction do
      @team_project = TeamProject.build(@organization.id, @team.id, @operate_project.id)
      Gitea::Organization::TeamProject::CreateService.call(@organization.gitea_token, @team.gtid, @organization.login, @operate_project.identifier)
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def destroy
    tip_exception("该组织团队项目包括组织所有项目,不允许更改") if @team.includes_all_project
    ActiveRecord::Base.transaction do
      @team_project.destroy!
      Gitea::Organization::TeamProject::DeleteService.call(@organization.gitea_token, @team.gtid, @organization.login, @operate_project.identifier)
      render_ok
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private
  def load_organization
    @organization = Organization.find_by(login: params[:organization_id]) || Organization.find_by(id: params[:organization_id])
    tip_exception("组织不存在") if @organization.nil?
    tip_exception("没有查看组织的权限") if org_limited_condition || org_privacy_condition
  end

  def load_team
    @team = Team.find_by_id(params[:team_id])
    tip_exception("组织团队不存在") if @team.nil?
    tip_exception("没有查看组织团队的权限") if team_not_found_condition
  end

  def load_operate_project
    @operate_project = Project.find_by(id: project_mark) || Project.find_by(identifier: project_mark)
    tip_exception("项目不存在") if @operate_project.nil?
  end

  def load_team_project
    @team_project = TeamProject.find_by(organization_id: @organization.id, team_id: @team.id, project_id: @operate_project.id)
    tip_exception("组织团队项目不存在") if @team_project.nil?
  end
end