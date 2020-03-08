class Oauth::CasController < Oauth::BaseController
  def create
    user, is_new_user = Oauth::CreateORFindCasUserService.call(current_user, auth_hash)
    successful_authentication(user)

    redirect_to root_url
  end


   def auth_hash
    JSON.parse(CGI.unescape(request.env['omniauth.auth'].extra.to_json))
  end
end