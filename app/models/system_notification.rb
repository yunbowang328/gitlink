# == Schema Information
#
# Table name: system_notifications
#
#  id          :integer          not null, primary key
#  subject     :string(255)
#  sub_subject :string(255)
#  content     :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class SystemNotification < ApplicationRecord

  has_many :system_notification_histories
  has_many :users, through: :system_notification_histories
end
