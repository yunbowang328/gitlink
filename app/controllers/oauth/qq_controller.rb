class Oauth::QQController < Oauth::BaseController
  def create
    user, new_user = Oauth::CreateOrFindQqAccountService.call(current_user, auth_hash)

    successful_authentication(user)

    render_ok(new_user: new_user)
  end
end