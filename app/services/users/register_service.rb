class Users::RegisterService < ApplicationService
  def initialize(params)
    @login     = params[:login]
    @namespace = params[:namespace]
    @password  = params[:password]
    @code      = params[:code]
  end

  def call
    code      = strip(@code)
    login     = strip(@login)
    namespace = strip(@namespace)
    password  = strip(@password)

    Rails.logger.info "Users::RegisterService params:   
      ##### code: #{code} login: #{login} namespace: #{namespace}  password: #{password} "

    email, phone = 
      if register_type == 1
        phone_register(login, code)
      elsif register_type == 0
        mail_register(login, code)
      end

    user = User.new(admin: false, login: namespace, mail: email, phone: phone, type: "User")
    user.password = password
    user.activate # 现在因为是验证码，所以在注册的时候就可以激活

    user
  end

  private
  # 手机注册
  def phone_register(login, code)
    Rails.logger.info("start register by phone:  phone is #{login}")
    email = nil
    phone = login
    
    [email, phone]
  end

  # 邮箱注册
  def mail_register(login, code)
    Rails.logger.info("start register by email:  email is #{login}")
    email = login
    phone = nil

    [email, phone]
  end

  def register_type
    phone_mail_type(@login)
  end
end
