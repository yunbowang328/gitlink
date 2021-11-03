module Register
  class Form < Register::BaseForm
    # login 登陆方式，支持邮箱、登陆、手机号等
    # namespace 用户空间地址
    # type: 1：手机号注册；2：邮箱注册
    attr_accessor :login, :namespace, :password, :password_confirmation, :code, :type

    validates :login, :code, :password, :password_confirmation, :namespace, presence: true, allow_blank: false
    validate :check!
    
    def check!
      Rails.logger.info "Register::Form params: code: #{code}; login: #{login}; 
        namespace: #{namespace}; password: #{password}; password_confirmation: #{password_confirmation}"
      
      type = phone_mail_type(strip(login))
      db_verifi_code = 
        if type == 1
          check_phone(login)
          VerificationCode.where(phone: login, code: code, code_type: 1).last
        elsif type == 0
          check_mail(login)
          VerificationCode.where(email: login, code: code, code_type: 8).last
        end
      
      check_login(namespace)
      check_verifi_code(db_verifi_code, code)
      check_password(password)
      check_password_confirmation(password, password_confirmation)
    end
  end
end
