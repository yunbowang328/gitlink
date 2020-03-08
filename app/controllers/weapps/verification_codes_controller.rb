class Weapps::VerificationCodesController < Weapps::BaseController
  before_action :require_wechat_login!

  def create
    params[:type] == 'register' ? check_can_register : check_can_reset_password
  end

  private

  def check_can_register
    login = params[:login].to_s.strip
    if login =~ /^[a-zA-Z0-9]+([._\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      user = User.find_by(mail: login)
      return render_error('该邮箱已注册') if user.present?
    elsif login =~ /^1\d{10}$/
      user = User.find_by(phone: params[:login])
      return render_error('该手机号已注册') if user.present?
    else
      return render_error('请输入正确的邮箱或手机号')
    end

    send_type = login =~ /^1\d{10}$/ ? 1 : 8

    # 发送验证码
    send_code(send_type, login)

    render_ok
  end

  def check_can_reset_password
    login = params[:login].to_s.strip
    if login =~ /^[a-zA-Z0-9]+([._\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      user = User.find_by(mail: login)
      return render_error('该邮箱尚未注册') if user.blank?
    elsif login =~ /^1\d{10}$/
      user = User.find_by(phone: login)
      return render_error('该手机号尚未注册') if user.blank?
    else
      return render_error('请输入正确的邮箱或手机号')
    end

    send_type = login =~ /^1\d{10}$/ ? 2 : 3

    # 发送验证码
    send_code(send_type, login)

    render_ok
  end

  def send_code send_type, login
    code = %W(0 1 2 3 4 5 6 7 8 9)
    verification_code = code.sample(6).join
    # 记录验证码
    sign = Digest::MD5.hexdigest("#{OPENKEY}#{login}")
    tip_exception(501, "请求不合理") if sign != params[:smscode]

    check_verification_code(verification_code, send_type, login)
  end
end