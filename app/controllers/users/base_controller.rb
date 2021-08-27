class Users::BaseController < ApplicationController

  before_action :check_observed_user_exists!

  helper_method :observed_logged_user?, :observed_user

  def observed_user
    @_observed_user ||= (User.find_by_login(params[:user_id]) || User.find_by_id(params[:user_id]))
  end

  def observed_logged_user?
    observed_user.id == User.current&.id
  end

  private

  def check_observed_user_exists!
    return if observed_user.present?
    render_not_found
  end

  def private_user_resources!
    require_login
    return if current_user.admin_or_business? || observed_logged_user?

    render_forbidden
  end

  def require_teacher!
    return if current_user.admin_or_business? || observed_user.is_teacher?

    render_forbidden
  end

  def require_auth_teacher!
    return if current_user.admin_or_business? || observed_user.certification_teacher?

    render_forbidden
  end

  def page_value
    params[:page].to_i <= 0 ? 1 : params[:page].to_i
  end

  def per_page_value
    params[:per_page].to_i > 0 && params[:per_page].to_i <= 100 ? params[:per_page].to_i : 20
  end
  alias_method :limit_value, :per_page_value

  def offset_value
    (page_value - 1) * limit_value
  end

  def paginate(objs, **opts)
    page     = page_value
    per_page = per_page_value

    unless opts[:special] && observed_logged_user?
      if objs.is_a?(Array)
        return Kaminari.paginate_array(objs).page(page).per(per_page)
      else
        return objs.page(page).per(per_page)
      end
    end

    # note: 为实现第一页少一条记录，让前端放置新建入口
    if page == 1
      objs.limit(per_page - 1)
    else
      objs.limit(per_page).offset((page - 2) * per_page + per_page - 1)
    end
  end
end