class Oauth::MulanossController < Oauth::BaseController
  include RegisterHelper
  # 需要educoder那边设置回调地址
  def create
    # user, new_user = Oauth::CreateOrFindWechatAccountService.call(current_user ,params)

    begin
      code = params['code'].to_s.strip
      tip_exception("code不能为空") if code.blank?
      new_user = false
      result = MulanossOauth::Service.access_token(code)
      result = MulanossOauth::Service.user_info(result[:access_token])

      # 存在该用户
      open_user = OpenUsers::Mulan.find_by(uid: result['id'])
      if open_user.present? && open_user.user.present?
        successful_authentication(open_user.user)
      else
        if current_user.blank? || !current_user.logged?
          new_user = true
          login = User.generate_login('ML')
          reg_result = autologin_register(login, "#{login}@forge.com" , "M#{login}2021#", 'mulan', true)
          open_user = OpenUsers::Mulan.create!(user_id: reg_result[:user][:id], uid: result['id'], extra: result)
          successful_authentication(open_user.user)
        else
          OpenUsers::Mulan.create!(user: current_user, uid: result["id"])
        end
      end

      redirect_to "/explore"
    rescue Exception => ex
      render_error(ex.message)
    end
  end
end
