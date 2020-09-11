class Oauth::EducoderController < Oauth::BaseController
  def bind
    begin
      login = params[:login]
      mail = params[:mail] || nil
      callback_url = params[:callback_url]
      token = params[:token]

      ::OauthEducoderForm.new({login: login, token: token, callback_url: callback_url}).validate!
      
      open_user= OpenUsers::Educoder.find_by(uid: login)

      if open_user.present? && open_user.user.present? && open_user.user.email_binded?
        Rails.logger.info "######## open_user exist and open_user.user exsit and email is binded ok"
        successful_authentication(open_user.user)

        redirect_to callback_url
      else
        Rails.logger.info "######## open user not exits"
        user = User.find_by('login = ? or mail = ?', login, mail)

        if user.is_a?(User)
          OpenUsers::Educoder.create!(user: user, uid: login)
          successful_authentication(user)

          redirect_to callback_url
        else
          redirect_to oauth_register_path(login: login, callback_url: callback_url)
        end
      end
    rescue WechatOauth::Error => ex
      render_error(ex.message)
    end
  end
end
