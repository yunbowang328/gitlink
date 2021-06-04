class Projects::ListMyQuery < ApplicationQuery

  attr_reader :params, :user, :is_current_admin_user

  # sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params,user,is_current_admin_user)
    @params = params
    @user = user
    @is_current_admin_user = is_current_admin_user
  end

  def call
    if is_current_admin_user 
      projects = Project
    else 
      projects = Project.visible
    end

    if params[:category].blank?
      normal_projects = projects.members_projects(user.id).to_sql
      org_projects = projects.joins(team_projects: [team: :team_users]).where(team_users: {user_id: user.id}).to_sql
      projects = Project.from("( #{ normal_projects} UNION #{ org_projects } ) AS projects").distinct
    elsif params[:category].to_s == "join"
      normal_projects = projects.where.not(user_id: user.id).members_projects(user.id).to_sql
      org_projects = projects.joins(team_projects: [team: :team_users]).where(team_users: {user_id: user.id}).to_sql
      projects = Project.from("( #{ normal_projects} UNION #{ org_projects } ) AS projects").distinct
    elsif params[:category].to_s == "manage"
      projects = projects.where(user_id: user.id)
    elsif params[:category].to_s == "watched"  #我关注的
      projects = projects.where.not(user_id: user.id).joins(:watchers).where(watchers: {watchable_type: "Project", user_id: user.id})
    elsif params[:category].to_s == "forked"  #我fork的
      fork_ids = user.fork_users.select(:id, :fork_project_id).pluck(:fork_project_id)
      projects = projects.where(id: fork_ids)
    # elsif params[:category].to_s == "public" 
    #   projects = projects.visible.joins(:members).where(members: { user_id: user.id })
    # elsif params[:category].to_s == "private"
    #   projects = projects.is_private.joins(:members).where(members: { user_id: user.id })
    end

    if params[:is_public].present?
      projects = projects.is_private if params[:is_public].to_s == "private"
      projects = projects.visible if params[:is_public].to_s == "public"
    end

    if params[:project_type].to_s === "common"
      projects = projects.common
    elsif params[:project_type].to_s === "mirror"
      projects = projects.mirror
    elsif params[:project_type].to_s === "sync_mirror"
      projects = projects.sync_mirror
    end
      
    q = projects.ransack(name_or_identifier_cont: params[:search])

    scope = q.result.includes(:project_category, :project_language,:owner, :repository, :has_pinned_users)

    sort = params[:sort_by] || "updated_on"
    sort_direction = params[:sort_direction] || "desc"
    
    if params[:choosed].present? && params[:choosed].is_a?(Array)
      scope.order("FIELD(id, #{params[:choosed].reverse.join(",")}) desc")
    else
      scope.order("projects.#{sort} #{sort_direction}")
    end
  end
end
