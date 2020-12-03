# == Schema Information
#
# Table name: private_messages
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  target_id   :integer
#  sender_id   :integer
#  receiver_id :integer
#  content     :text(65535)
#  send_time   :datetime
#  status      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_private_messages_on_user_id  (user_id)
#

class PrivateMessage < ApplicationRecord
  belongs_to :user
  belongs_to :target, class_name: "User"
  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"

  scope :without_deleted, -> { where.not(status: 2) }
  scope :only_unread, -> { where(status: 0) }
end
