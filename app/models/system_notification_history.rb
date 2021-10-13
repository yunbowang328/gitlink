# == Schema Information
#
# Table name: system_notification_histories
#
#  id                :integer          not null, primary key
#  system_message_id :integer
#  user_id           :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_system_notification_histories_on_system_message_id  (system_message_id)
#  index_system_notification_histories_on_user_id            (user_id)
#

class SystemNotificationHistory < ApplicationRecord

  belongs_to :system_notification
  belongs_to :user

  validates :system_notification_id, uniqueness: { scope: :user_id, message: '只能阅读一次'}
end
