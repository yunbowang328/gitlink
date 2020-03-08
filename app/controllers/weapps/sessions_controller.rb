class Weapps::SessionsController < Weapps::BaseController
  before_action :require_wechat_login!

  def create
    return render_error('重复登录') if current_user.present? && current_user.logged?

    user = User.try_to_login(params[:login], params[:password])

    return render_error('错误的账号或密码') if user.blank?
    return render_error('违反平台使用规范，账号已被锁定') if user.locked?
    return render_error('错误的账号或密码') unless user.check_password?(params[:password].to_s)

    if user.wechat_open_user && user.wechat_open_user.uid != session_unionid
      render_error('该账号已被其它微信号绑定')
      return
    end

    # session[:wechat_user_extra].delete(:nickName)
    # 绑定微信号
    # open_user = OpenUsers::Wechat.find_by(uid: session_unionid)
    # if open_user.present? && open_user.user_id.nil?
    #   open_user.update!(user_id: user.id)
    # els
    if user.wechat_open_user.blank?
      OpenUsers::Wechat.create!(user: user, uid: session_unionid)
    end

    successful_authentication(user)
  end
end