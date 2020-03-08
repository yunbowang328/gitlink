class Users::BindEmailForm
  include ActiveModel::Model

  attr_accessor :email, :code

  validates :email, presence: true#, format: { with: CustomRegexp::EMAIL }
  validates :code, presence: true
end