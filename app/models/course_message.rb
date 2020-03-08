class CourseMessage < ApplicationRecord
  enum status: { UNHANDLED: 0, PASSED: 1, REJECTED: 2 }
  belongs_to :course
  belongs_to :user
  has_one :course_act, class_name: 'CourseActivity', as: :course_act, dependent: :destroy

  scope :find_by_course, ->(course) { where(course_id: course.id) }
  scope :join_course_requests, -> { where(course_message_type: "JoinCourseRequest") }
  scope :unhandled, -> { where(status: :UNHANDLED) }

  scope :unhandled_join_course_requests_by_course, ->(course) { find_by_course(course).join_course_requests.unhandled }

  after_create :act_as_course_activity

  def pass!
    update!(status: :PASSED)
    send_deal_tiding(1)
  end

  def application_user
    User.find_by(id: course_message_id)
  end

  def reject!
    update!(status: :REJECTED)
    send_deal_tiding(2)
  end

  private

  #课程动态公共表记录
  def act_as_course_activity
    self.course_act << CourseActivity.new(user_id: course_message_id, course_id: course_id)
  end

  def send_deal_tiding deal_status
    # 发送申请处理结果消息
    Tiding.create!(
      user_id: course_message_id, trigger_user_id: 0, container_id: course_id, container_type: 'DealCourse',
      belong_container: course, extra: content.to_i == 2 ? '9' : '7', tiding_type: 'System', status: deal_status
    )
    # 将申请消息置为已处理
    Tiding.where(trigger_user_id: course_message_id, container_id: course_id, container_type: 'JoinCourse', status: 0).update_all(status: 1)
  end
end