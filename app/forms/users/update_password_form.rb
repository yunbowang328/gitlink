class Users::UpdatePasswordForm
  include ActiveModel::Model

  attr_accessor :password, :old_password

  validates :password, presence: true, length: { minimum: 8, maximum: 16 }, format: { with: CustomRegexp::PASSWORD, message: "8~16位密码，支持字母数字和符号" }
end