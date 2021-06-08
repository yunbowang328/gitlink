class Users::AdminCreateUserForm
  include ActiveModel::Model

  
  attr_accessor :phone, :password

  validates :phone, presence: true, format: { with: CustomRegexp::PHONE, message: "手机号格式错误" }
  validates :password, presence: true, length: { minimum: 8, maximum: 16 }, format: { with: CustomRegexp::PASSWORD, message: "8~16位密码，支持字母数字和符号" }

end

