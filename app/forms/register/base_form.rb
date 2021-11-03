module Register
  class BaseForm < ::BaseForm
    include ActiveModel::Model
    
    Error                     = Class.new(StandardError)
    EmailError                = Class.new(Error)
    LoginError                = Class.new(Error)
    PhoneError                = Class.new(Error)
    PasswordFormatError       = Class.new(Error)
    VerifiCodeError           = Class.new(Error)
    PasswordConfirmationError = Class.new(Error)
    
    private
    def check_login(login)
      login = strip(login)
      raise LoginError, "登录名格式有误" unless login =~ CustomRegexp::LOGIN

      login_exist = Owner.exists?(login: login) || ReversedKeyword.check_exists?(login)
      raise LoginError, '登录名已被使用' if login_exist
    end

    def check_mail(mail)
      mail = strip(mail)
      raise EmailError, "邮件格式有误" unless mail =~ CustomRegexp::EMAIL
  
      mail_exist = Owner.exists?(mail: mail)
      raise EmailError, '邮箱已被使用' if mail_exist
    end
    
    def check_phone(phone)
      phone = strip(phone)
      raise PhoneError, "手机号格式有误" unless phone =~ CustomRegexp::PHONE

      phone_exist = Owner.exists?(phone: phone)
      raise PhoneError, '手机号已被使用' if phone_exist
    end

    def check_password(password)
      password = strip(password)
      raise PasswordFormatError, "密码8~16位密码，支持字母数字和符号" unless password =~ CustomRegexp::PASSWORD
    end

    def check_password_confirmation(password, password_confirmation)
      password = strip(password)
      password_confirmation = strip(password_confirmation)

      raise PasswordFormatError, "确认密码为8~16位密码，支持字母数字和符号" unless password_confirmation =~ CustomRegexp::PASSWORD
      raise PasswordConfirmationError, "两次输入的密码不一致" unless password == password_confirmation
    end

    def check_verifi_code(verifi_code, code)
      code = strip(code)
      return if code == "123123" # TODO 万能验证码，用于测试

      raise VerifiCodeError, "验证码不正确" if verifi_code&.code != code
      raise VerifiCodeError, "验证码已失效" if !verifi_code&.effective?
    end
    
  end
end
