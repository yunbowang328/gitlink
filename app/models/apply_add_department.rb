class ApplyAddDepartment < ApplicationRecord
  belongs_to :user
  belongs_to :school
  belongs_to :department

  has_many :applied_messages, as: :applied
  has_many :tidings, as: :container, dependent: :destroy

  after_create :send_notify

  private
  def send_notify
    tidings.create!(user_id: 1, trigger_user_id: user_id, belong_container: school, tiding_type: 'Apply', status: 0)
  end
end