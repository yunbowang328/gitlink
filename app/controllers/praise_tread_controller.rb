class PraiseTreadController < ApplicationController
  before_action :require_login, except: %i[index]
  before_action :find_project_with_id

  def index
    scope = @project.praise_treads.includes(:user)
    @praises = paginate(scope)
  end

  def like
    begin
      return normal_status(2, "你已点过赞了") if current_user.liked?(@project)
      current_user.like!(@project)
      render_ok({praises_count: @project.praises_count, praised: current_user.liked?(@project)})
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def unlike
    begin
      return normal_status(2, "你还没有点过赞噢") unless current_user.liked?(@project)
      current_user.unlike!(@project)
      render_ok({praises_count: @project.praises_count, praised: current_user.liked?(@project)})
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def check_like
    is_like = current_user.liked?(@project)
    render_result(is_like ? 1 : 0)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private

end
