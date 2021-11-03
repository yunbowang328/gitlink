module Accounts
  class ResetPasswordForm < ::BaseForm
    # login 邮箱、手机号
    # code 验证码
    # type: 1：手机号注册；2：邮箱注册
    attr_accessor :login, :password, :password_confirmation, :code

    validates :login, :code, :password, :password_confirmation, presence: true, allow_blank: false
    validate :check!
    
    def check!
      Rails.logger.info "ResetPasswordForm params: code: #{code} login: #{login} 
        password: #{password} password_confirmation: #{password_confirmation}"
      
      type = phone_mail_type(login)
      
      db_verifi_code = 
        if type == 1
          check_phone_format(login)
          VerificationCode.where(phone: login, code: code, code_type: 1).last
        elsif type == 0
          Rails.logger.info "9999999999 #{login}"
          check_email_format(login)
          VerificationCode.where(email: login, code: code, code_type: 8).last
        end
      
      check_password(password)
      check_password_confirmation(password, password_confirmation)
      check_verifi_code(db_verifi_code, code)
    end

    def check_phone_format(phone)
      phone = strip(phone)
      raise LoginError, "登录名格式有误" unless phone =~ CustomRegexp::LOGIN
    end

    def check_email_format(mail)
      mail = strip(mail)
      raise EmailError, "邮件格式有误" unless mail =~ CustomRegexp::EMAIL
    end
  end
end
