# == Schema Information
#
# Table name: system_notifications
#
#  id          :integer          not null, primary key
#  subject     :string(255)
#  sub_subject :string(255)
#  content     :text(65535)
#  is_top      :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class SystemNotification < ApplicationRecord

  default_scope { order(created_at: :desc)}

  has_many :system_notification_histories
  has_many :users, through: :system_notification_histories

  scope :is_top, lambda { where(is_top: true) }

end
