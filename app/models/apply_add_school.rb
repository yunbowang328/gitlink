class ApplyAddSchool < ApplicationRecord
  belongs_to :school
  belongs_to :user

  has_many :applied_messages, as: :applied
  has_many :tidings, as: :container, dependent: :destroy

  after_create :send_notify
  # after_destroy :after_delete_apply

  private

  def send_notify
    Tiding.create!(user_id: 1, status: 0, container_id: id, container_type: 'ApplyAddSchools',
                   trigger_user_id: user_id, belong_container: school, tiding_type: 'Apply')
  end

  # def after_delete_apply
  #
  # end

end