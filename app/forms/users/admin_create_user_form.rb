class Users::AdminCreateUserForm
  include ActiveModel::Model

  
  attr_accessor :mail, :login, :phone, :password

  validates :login, presence: true
  validates :mail, presence: true, format: { with: CustomRegexp::EMAIL, message: "邮箱格式错误." }
  validates :phone, presence: true, format: { with: CustomRegexp::PHONE, message: "手机号格式错误" }
  validates :password, presence: true, length: { minimum: 8, maximum: 16 }, format: { with: CustomRegexp::PASSWORD, message: "8~16位密码，支持字母数字和符号" }

  validate :check_login, :check_mail

  private
  def check_mail
    return if mail.blank?
    if User.exists?(mail: mail)
      raise "邮箱 #{mail} 已使用." 
      errors.add(:mail, :not_exist)
    end
  end
  
  def check_login
    return if login.blank?
    if User.exists?(login: login)
      raise "手机号 #{login} 已使用." 
      errors.add(:login, :not_exist)
    end
  end

end

