class Users::LoginForm
  include ActiveModel::Model

  attr_accessor :password, :login

  validates :login, presence: true
  validates :password, presence: true, length: { minimum: 6, maximum: 16 }, format: { with: CustomRegexp::PASSWORD, message: "6~16位，支持字母数字和符号" }
end