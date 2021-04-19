# == Schema Information
#
# Table name: message_details
#
#  id         :integer          not null, primary key
#  content    :text(4294967295)
#  message_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_message_details_on_message_id  (message_id)
#

class MessageDetail < ApplicationRecord
  # belongs_to :message, :touch => true
  validates :content, length: { maximum: 10000, too_long: "内容不能超过10000个字符" }

end
