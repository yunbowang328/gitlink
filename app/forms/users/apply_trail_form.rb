class Users::ApplyTrailForm
  include ActiveModel::Model

  attr_accessor :user, :phone, :code, :reason

  validates :reason, presence: true
  validates :phone, presence: true, format: { with: CustomRegexp::PHONE }, unless: -> { user.phone_binded? }
  validates :code, presence: true, unless: -> { user.phone_binded? }

  validate :check_user_certification
  def check_user_certification
    return if user.certification != 1

    errors.add(:user, :already_trial)
  end
end