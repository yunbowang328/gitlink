class Organizations::ProjectsController < Organizations::BaseController
  before_action :load_organization

  def index
    public_projects_sql = @organization.projects.where(is_public: true).to_sql
    private_projects_sql = @organization.projects
                               .where(is_public: false)
                               .joins(team_projects: {team: :team_users})
                               .where(team_users: {user_id: current_user.id}).to_sql
    @projects = Project.from("( #{ public_projects_sql} UNION #{ private_projects_sql } ) AS projects")

    @projects = @projects.ransack(name_or_identifier_cont: params[:search]).result if params[:search].present?
    @projects = @projects.includes(:owner).order("projects.#{sort} #{sort_direction}")
    @projects = paginate(@projects)
  end

  def search
    tip_exception("请输入搜索关键词") if params[:search].nil?
    public_projects_sql = @organization.projects.where(is_public: true).to_sql
    private_projects_sql = @organization.projects
                               .where(is_public: false)
                               .joins(team_projects: {team: :team_users})
                               .where(team_users: {user_id: current_user.id}).to_sql
    @projects = Project.from("( #{ public_projects_sql} UNION #{ private_projects_sql } ) AS projects")

    @projects = @projects.ransack(name_or_identifier_cont: params[:search]).result
    @projects = @projects.includes(:owner).order("projects.#{sort} #{sort_direction}")
  end

  private

  def load_organization
    @organization = Organization.find_by(login: params[:organization_id]) || Organization.find_by(id: params[:organization_id])
    return render_not_found("组织不存在") if @organization.nil?
    return render_forbidden("没有查看组织的权限") if org_limited_condition || org_privacy_condition
  end

  def sort
    Project.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'updated_on'
  end

  def sort_direction
    %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
  end
end