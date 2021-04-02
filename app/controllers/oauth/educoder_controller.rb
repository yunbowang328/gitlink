class Oauth::EducoderController < Oauth::BaseController
  include RegisterHelper

  def bind
    begin
      login = params[:login]
      mail = params[:mail] || nil
      callback_url = params[:callback_url]
      token = params[:token]

      ::OauthEducoderForm.new({login: login, token: token, callback_url: callback_url}).validate!

      open_user= OpenUsers::Educoder.find_by(uid: login) || OpenUsers::Educoder.find_by(uid: mail)

      if open_user.present? && open_user.user.present? && open_user.user.email_binded?
        Rails.logger.info "######## open_user exist and open_user.user exsit and email is binded ok"
        successful_authentication(open_user.user)

        redirect_to callback_url
      else
        Rails.logger.info "######## open user not exits"
        user = User.find_by(login: login) || User.find_by(mail: mail)

        if user.is_a?(User) && !user.is_a?(AnonymousUser)
          OpenUsers::Educoder.create!(user: user, uid: login)
          successful_authentication(user)

          redirect_to callback_url
        else
          redirect_to oauth_register_path(login: login, mail: mail, callback_url: callback_url)
        end
      end
    rescue WechatOauth::Error => ex
      render_error(ex.message)
    end
  end

  # 需要educoder那边设置回调地址
  def create
    begin
      code = params['code'].to_s.strip
      tip_exception("code不能为空") if code.blank?

      new_user = false
      result = EducoderOauth::Service.access_token(code)
      result = EducoderOauth::Service.user_info(result[:access_token])

      # 存在该用户
      open_user = OpenUsers::Educoder.find_by(uid: result['login'])
      if open_user.present? && open_user.user.present?
        successful_authentication(open_user.user)
      else
        if current_user.blank? || !current_user.logged?
          new_user = true
          login = User.generate_login('E')
          reg_result = autologin_register(login,"#{login}@forge.com", "Ec#{login}2021#", 'educoder', true)
          if reg_result[:message].blank?
            open_user = OpenUsers::Educoder.create!(user_id: reg_result[:user][:id], uid: result['login'], extra: result)
            successful_authentication(open_user.user)
          else
            render_error(reg_result[:message])
          end
        else
          OpenUsers::Educoder.create!(user: current_user, uid: result['login'], extra: result)
        end
      end

      redirect_to root_path(new_user: new_user)
    rescue Exception => ex
      render_error(ex.message)
    end
  end
end
