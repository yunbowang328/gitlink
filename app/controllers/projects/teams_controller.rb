class Projects::TeamsController < Projects::BaseController
  before_action :load_operate_team, only: [:create, :destroy]
  before_action :load_team_project, only: :destroy

  def index
    if @project.owner.is_a?(Organization)
      @teams = Team.joins(:team_projects).where(team_projects: {project_id: @project.id})
    else
      @teams = Team.none
    end
    @teams = paginate(@teams)
  end

  def create
    ActiveRecord::Base.transaction do
      @team_project = TeamProject.build(@owner.id, @operate_team.id, @project.id)
      Gitea::Organization::TeamProject::CreateService.call(current_user.gitea_token, @operate_team.gtid, @owner.login, @project.identifier)
      render_ok
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def destroy
    ActiveRecord::Base.transaction do
      @team_project.destroy!
      Gitea::Organization::TeamProject::DeleteService.call(current_user.gitea_token, @operate_team.gtid, @owner.login, @project.identifier)
      render_ok
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private
  def load_operate_team
    @operate_team = Team.find_by(id: params[:team_id]) || Team.find_by(id: params[:id])
    tip_exception("项目不存在") if @operate_team.nil?
    tip_exception("该组织团队拥有组织所有项目，无法进行操作") if @operate_team.includes_all_project
  end

  def load_team_project
    @team_project = TeamProject.find_by(organization_id: @owner.id, team_id: @operate_team.id, project_id: @project.id)
    tip_exception("组织团队项目不存在") if @team_project.nil?
  end
end