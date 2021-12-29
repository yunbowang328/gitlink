module Register
  class RemoteForm < Register::BaseForm
    # login 登陆方式，支持邮箱、登陆、手机号等
    attr_accessor :username, :email, :password, :platform

    validates :username, :email, :password, presence: true
    validate :check!
    
    def check!
      Rails.logger.info "Register::RemoteForm params: username: #{username}; email: #{email}; password: #{password}; platform: #{platform}"
      check_login(username)
      check_mail(email)
      check_password(password)
    end
  end
end
