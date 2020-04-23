class MessageDetail < ApplicationRecord
  # belongs_to :message, :touch => true
  validates :content, length: { maximum: 10000, too_long: "内容不能超过10000个字符" }

end
