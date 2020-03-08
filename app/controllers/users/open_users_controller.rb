class Users::OpenUsersController < Users::BaseAccountController
  def destroy
    current_open_users.destroy!

    render_ok
  end

  private

  def current_open_users
    @_current_third_party ||= observed_user.open_users.find(params[:id])
  end
end