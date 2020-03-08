class Users::WatchesController < Users::BaseController
  before_action :require_login, :check_auth

  def create
    if observed_logged_user?
      render_error('不能关注自己')
      return
    end

    if current_user.watched?(observed_user)
      render_ok
      return
    end

    current_user.watch!(observed_user)
    render_ok
  end

  def destroy
    unless current_user.watched?(observed_user)
      render_ok
      return
    end

    current_user.unwatch!(observed_user)
    render_ok
  end
end
