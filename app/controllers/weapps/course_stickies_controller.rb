class Weapps::CourseStickiesController < Weapps::BaseController
  # before_action :require_wechat_login!

  def create
    courses = params[:category] == "study" ? current_user.as_student_courses.started : current_user.manage_courses
    courses = courses.order("course_members.sticky=1 desc, course_members.sticky_time desc, courses.created_at desc").first

    return render_error("该课堂已置顶，请勿重复操作") if course_member.sticky && courses&.id.to_i == current_course.id
    course_member.update!(sticky: 1, sticky_time: Time.now)
    render_ok
  end

  def cancel_sticky
    return render_error("该课堂未置顶，无法取消") unless course_member.sticky
    course_member.update!(sticky: 0, sticky_time: nil)
    render_ok
  end

  private

  def current_course
    @_current_course = Course.find params[:course_id]
  end

  def course_member
    @_course_member = params[:category] == "study" ? current_course.students.find_by!(user_id: current_user.id) :
                      current_course.teachers.find_by!(user_id: current_user.id)
  end
end