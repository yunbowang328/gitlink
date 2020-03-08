class CourseGroup < ApplicationRecord
  default_scope { order("course_groups.position ASC") }
  belongs_to :course, counter_cache: true
  has_many :course_members
  has_many :exercise_group_settings,:dependent => :destroy
  has_many :attachment_group_settings, :dependent => :destroy
  has_many :homework_group_reviews, :dependent => :destroy
  has_many :teacher_course_groups, :dependent => :destroy
  has_many :homework_group_settings, :dependent => :destroy
  scope :by_group_ids, lambda { |ids| where(id: ids)}

  validates :name, length: { maximum: 60, too_long: "不能超过60个字符" }
  validates_uniqueness_of :name, scope: :course_id,  message: "不能创建相同名称的分班"

  after_create :generate_invite_code

  # 延迟生成邀请码
  def invite_code
    return generate_invite_code
  end

  # 生成邀请码
  CODES = %W(2 3 4 5 6 7 8 9 A B C D E F G H J K L N M O P Q R S T U V W X Y Z)
  def generate_invite_code
    code = read_attribute(:invite_code)
    if !code || code.size < 6
      code = CODES.sample(6).join
      return generate_invite_code if CourseGroup.where(invite_code: code).present?
      update_attribute(:invite_code, code)
    end
    code
  end

end
