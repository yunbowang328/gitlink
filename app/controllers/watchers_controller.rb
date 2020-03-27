class WatchersController < ApplicationController
  before_action :require_login, except: %i[index]
  before_action :find_project_with_id

  def index
    scope = @project.watchers.includes(:user)
    @watchers = paginate(scope)
  end

  def unfollow
    begin
      return normal_status(2, "你还没有关注哦") unless current_user.watched?(@project)
      current_user.unwatch!(@project)
      render_ok({watchers_count: @project.watchers_count, watched: current_user.watched?(@project)})
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def follow
    begin
      return normal_status(2, "你已关注了") if current_user.watched?(@project)
      current_user.watch!(@project)
      render_ok({watchers_count: @project.watchers_count, watched: current_user.watched?(@project)})
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def check_watch
    is_watch = current_user.watched?(@project)
    render_result(is_watch ? 1 : 0)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

end
