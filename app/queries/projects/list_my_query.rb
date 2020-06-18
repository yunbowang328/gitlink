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

    if params[:is_public].present? && !params[:is_public]
      projects = projects.is_private.joins(:members).where(members: { user_id: user.id })
    else 
      projects = projects.visible.joins(:members).where(members: { user_id: user.id })
    end

    if params[:category].blank?
      projects = projects.joins(:members).where(members: { user_id: user.id })
    elsif params[:category].to_s == "join"
      projects = projects.where.not(user_id: user.id).joins(:members).where(members: { user_id: user.id })
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

    if params[:project_type].to_s === "common"
      projects = projects.common
    elsif params[:project_type].to_s === "mirror"
      projects = projects.mirror
    end
      
    q = projects.ransack(name_or_identifier_cont: params[:search])

    scope = q.result.includes(:project_category, :project_language,:owner, :repository)

    sort = params[:sort_by] || "updated_on"
    sort_direction = params[:sort_direction] || "desc"
    scope.order("projects.#{sort} #{sort_direction}")
  end
end
