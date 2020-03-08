class Users::BindPhoneForm
  include ActiveModel::Model

  attr_accessor :phone, :code

  validates :phone, presence: true, format: { with: CustomRegexp::PHONE }
  validates :code, presence: true
end