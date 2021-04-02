class Users::UpdateInfoForm
  include ActiveModel::Model

  attr_accessor :email, :password, :login

  validates :email, presence: true, format: { with: CustomRegexp::EMAIL }
  validates :password, presence: true
  validates :login, presence: true
end
