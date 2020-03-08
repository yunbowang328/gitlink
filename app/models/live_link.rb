class LiveLink < ApplicationRecord
  belongs_to :course
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
