class Gitea::User::ChangePasswordForm
  include ActiveModel::Model

  attr_accessor :user
  attr_accessor :email, :login, :password

  validates :email, presence: true, format: { with: CustomRegexp::EMAIL }
  validates :login, presence: true
  validates :password, presence: true

  # validate :check_old_password

  def check_old_password
     return if user.check_password?(old_password.to_s)

     errors.add(:old_password, :password_error)
  end

  # def check_user!
  #   user === current_user
  # end
end
