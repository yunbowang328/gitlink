# == Schema Information
#
# Table name: live_links
#
#  id          :integer          not null, primary key
#  course_id   :integer
#  user_id     :integer
#  url         :string(255)
#  description :text(65535)
#  on_status   :boolean          default("0")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  course_name :string(255)
#  platform    :string(255)
#  live_time   :datetime
#  duration    :integer
#  position    :integer
#
# Indexes
#
#  index_live_links_on_course_id  (course_id)
#  index_live_links_on_user_id    (user_id)
#

class LiveLink < ApplicationRecord
  # belongs_to :course
  belongs_to :user

  has_many :tidings, as: :container, dependent: :destroy

  # validates :url, format: { with: CustomRegexp::URL, message: "必须为网址超链接" }
  validates :description, length: { maximum: 100, too_long: "不能超过100个字符" }
  validates :course_name, presence: true
  validates :platform, presence: true
  # validates :live_time, presence: true
  validates :duration, numericality: { only_integer: true, greater_than: 0}, allow_blank: true

  def op_auth?
    user == User.current || User.current.admin_or_business?
  end

  def delete_auth?
    user == User.current || User.current.admin?
  end
end
