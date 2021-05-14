# == Schema Information
#
# Table name: faqs
#
#  id         :integer          not null, primary key
#  question   :string(255)
#  url        :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Faq < ApplicationRecord
  
  validates :question, presence: true,length: { maximum: 100, too_long: "最多%{count}个字符" }
  validates :url, format: { with: CustomRegexp::URL, multiline: true, message: "格式不正确" }

  scope :select_without_id, -> { select(:question, :url) }
  scope :search_question, ->(keyword) { where("question LIKE ?", "%#{keyword}%") unless keyword.blank?}

end
