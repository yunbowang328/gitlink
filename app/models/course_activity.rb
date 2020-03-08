class CourseActivity < ApplicationRecord
  belongs_to :course_act, polymorphic: true
  belongs_to :course
  belongs_to :user
  belongs_to :exercise
  belongs_to :poll
  belongs_to :course_message
  belongs_to :homework_common

  # after_create :add_course_lead

  def container_name
    case course_act_type
    when "HomeworkCommon"
      course_act&.name
    when "Exercise"
      course_act&.exercise_name
    when "Poll"
      course_act&.poll_name
    when "Message"
      course_act&.subject
    else
      ""
    end
  end

  # 发布新课导语
  # 导语要放置在课程创建信息之后
  def add_course_lead
    # 避免空数据迁移报错问题
    if self.course_act_type == "Course"
      sample = PlatformSample.where(:samples_type => "courseGuide").first
      if sample.present? && sample.contents.present?
        content = sample.contents
      elsif Message.find(12440)
        lead_message = Message.find(12440)
        content = lead_message.content
      end
      if content
        # message的status状态为0为正常，为1表示创建课程时发送的message
        # author_id 默认为课程使者创建
        message = Message.create(subject: "新课导语",
                                board_id: course.course_board.try(:id),
                                author_id: 1,
                                sticky: true,
                                status: true,
                                message_detail_attributes: {content: content}
                              )
        # 更新的目的是为了排序，因为该条动态的时间可能与课程创建的动态创建时间一致
        message.course_acts.first.update_attribute(:updated_at, message.course_acts.first.updated_at + 1) if message.course_acts.first
      end
    end
  end
end
