class Weapps::CheckAccountsController < Weapps::BaseController
  def create
    params[:type] == 'register' ? check_can_register : check_can_bind
  end

  private

  def check_can_bind
    if params[:login] =~ /^[a-zA-Z0-9]+([._\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      user = User.find_by(mail: params[:login])
      return render_error('该邮箱尚未注册') if user.blank?
    elsif params[:login] =~ /^1\d{10}$/
      user = User.find_by(phone: params[:login])
      return render_error('该手机号尚未注册') if user.blank?
    else
      user = User.find_by(login: params[:login])
      return render_error('该账号尚未注册') if user.blank?
    end

    return render_error('该账号已经绑定') if user.wechat_open_user.present?

    render_ok
  end

  def check_can_register
    if params[:login] =~ /^[a-zA-Z0-9]+([._\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      user = User.find_by(mail: params[:login])
      return render_error('该邮箱已注册') if user.present?
    elsif params[:login] =~ /^1\d{10}$/
      user = User.find_by(phone: params[:login])
      return render_error('该手机号已注册') if user.present?
    else
      return render_error('请输入正确的邮箱或手机号')
    end

    render_ok
  end
end