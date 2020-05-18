class WatchersController < ApplicationController
  before_action :require_login, except: %i[index]
  # before_action :find_project_with_id
  before_action :get_target

  def index
    scope = @target.watchers.includes(:user)
    @watchers = paginate(scope)
  end

  def unfollow
    begin
      return normal_status(2, "你还没有关注哦") unless current_user.watched?(@target)
      current_user.unwatch!(@target)
      if @target_type.downcase == "project"
        render_ok({watchers_count: @target.watchers_count, watched: false})
      else 
        render_ok({ watched: false})
      end

    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def follow
    begin
      return normal_status(2, "你已关注了") if current_user.watched?(@target)
      current_user.watch!(@target)
      if @target_type.downcase == "project"
        render_ok({watchers_count: @target.watchers_count, watched: true})
      else 
        render_ok({ watched: false})
      end
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def check_watch
    is_watch = current_user.watched?(@target)
    render_result(is_watch ? 1 : 0)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 

  def get_target 
    @target_type = params[:target_type].to_s
    case  @target_type 
    when "project" 
      @target = @target_type.capitalize.constantize.find_by(id: params[:id])
    else 
      @target = @target_type.capitalize.constantize.find_by(login: params[:id])   #用户
    end

    unless @target.present?
      normal_status(-1, "目标不存在")
    end

  end

end
