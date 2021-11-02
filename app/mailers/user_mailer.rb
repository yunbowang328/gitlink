class UserMailer < ApplicationMailer
  # 注意：这个地方一定要和你的邮箱服务域名一致
  default from: 'notification@trustie.org'

  # 用户注册验证码
  def register_email(mail, code)
    @code = code
    mail(to: mail, subject: 'Gitink | 注册验证码')
  end

end
