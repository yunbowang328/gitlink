class Users::LoginForm
  include ActiveModel::Model

  attr_accessor :password, :login

  validates :login, presence: true
  validates :password, presence: true, length: { minimum: 8, maximum: 16 }, format: { with: CustomRegexp::PASSWORD, message: "8~16位，支持字母数字和符号" }
end