class UserMailer < ApplicationMailer
  # 注意：这个地方一定要和你的邮箱服务域名一致
  default from: 'educoder@trustie.org'

  # 用户注册验证码
  def register_email(mail, code)
    @code = code
    mail(to: mail, subject: '验证你的电子邮件')
  end

  # 课堂讨论区的邮件通知
  def course_message_email(mail, message_id)
    @message = Message.find_by(id: message_id)
    @course = @message&.board&.course
    mail(to: mail, subject: '课堂发布了新的帖子') if @message.present? && @course.present?
  end
end
