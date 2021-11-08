module Register
  class BaseForm < ::BaseForm
    include ActiveModel::Model
    
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
  end
end
