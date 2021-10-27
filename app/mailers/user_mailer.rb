class UserMailer < ApplicationMailer
  # 注意：这个地方一定要和你的邮箱服务域名一致
  default from: 'notification@gitlink.org.cn'

  # 用户注册验证码
  def register_email(mail, code)
    @code = code
    mail(to: mail, subject: 'GitLink | 注册确实开源邮箱验证')
  end
end
