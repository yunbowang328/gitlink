class Gitea::User::ChangeEmailForm
  include ActiveModel::Model

  attr_accessor :user
  attr_accessor :email, :login

  validates :email, presence: true, format: { with: CustomRegexp::EMAIL }
  validates :login, presence: true
end
