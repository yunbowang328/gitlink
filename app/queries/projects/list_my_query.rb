class Projects::ListMyQuery < ApplicationQuery

  attr_reader :params, :user

  # sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params,user)
    @params = params
    @user = user
  end

  def call
    if params[:category].blank?
      projects = Project.joins(:members).where(members: { user_id: user.id })
    elsif params[:category].to_s == "manage"
      projects = Project.where(user_id: user.id)
    elsif params[:category].to_s == "watched"  #我关注的
      projects = Project.joins(:watchers).where("watchable_type = ? and user_id = ?", "Project", user.id)
    elsif params[:category].to_s == "forked"  #我fork的
      fork_ids = user.fork_users.select(:id, :fork_project_id).pluck(:fork_project_id)
      projects = Project.where(id: fork_ids)
    else
      projects = Project.where.not(user_id: user.id).joins(:members).where(members: { user_id: user.id })
    end
    unless params[:is_public].blank?
      projects = projects.where(is_public: (params[:is_public].to_s == "publicly"))
    end

    scope = projects.includes(:project_category,:project_score, :project_language,:owner)

    sort = params[:sort_by] || "updated_on"
    sort_direction = params[:sort_direction] || "desc"
    scope.order("projects.#{sort} #{sort_direction}")
  end
end
