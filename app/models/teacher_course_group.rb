class TeacherCourseGroup < ApplicationRecord
  belongs_to :course_group
  belongs_to :course, optional: true
  belongs_to :user

  belongs_to :course_member, optional: true

  scope :find_teacher_group_ids, lambda { |ids| where(course_group_id: ids) unless ids.blank?}
  scope :get_user_groups,lambda {|ids| where(user_id:ids)}

  validates_uniqueness_of :course_group_id, scope: :course_member_id

  def course_members
    self.course_group.course_members
  end

end
