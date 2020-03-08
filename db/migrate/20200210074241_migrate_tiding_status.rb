class MigrateTidingStatus < ActiveRecord::Migration[5.2]
  def change
    Tiding.where(container_type: "JoinCourse", status: 0).each do |tiding|
      unless CourseMessage.where(course_message_id: tiding.trigger_user_id, course_id: tiding.container_id, course_message_type: "JoinCourseRequest", status: 0).exists?
        tiding.update!(status: 1)
      end
    end
  end
end
