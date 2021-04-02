class Users::UpdateInfoForm
  include ActiveModel::Model

  attr_accessor :email, :password

  validates :email, presence: true, format: { with: CustomRegexp::EMAIL }
  validates :password, presence: true
end
