class Admins::CoursesController < Admins::BaseController
  before_action :find_course, except: [:index]

  def index
    default_sort('created_at', 'desc')

    courses = Admins::CourseQuery.call(params)
    @ended_courses = courses.where(is_end: 1).size
    @processed_courses = courses.where(is_end: 0).size
    @courses = paginate courses.includes(:school, :students, :attachments, :homework_commons, teacher: :user_extension)

    respond_to do |format|
      format.js
      format.html
      format.xlsx do
        @courses = courses.includes(:school, :students, :attachments, :homework_commons, :course_acts, teacher: :user_extension)
        filename = "课堂列表_#{Time.current.strftime('%Y%m%d%H%M%S')}.xlsx"
        render xlsx: 'index', filename: filename
      end
    end
  end

  def destroy
    if @course.is_delete == 0
      @course.delete!
      Tiding.create!(user_id: current_user.id, trigger_user_id: current_user.id, container_id: @course.id,
                     container_type: 'DeleteCourse', tiding_type: 'System', belong_container: @course, extra: @course.name)
    end
  end

  def update
    unless @course.update_attributes!(setting_params)
      redirect_to admins_courses_path
      flash[:danger] = "更新失败"
    end
  end

  private

  def find_course
    @course = Course.find_by!(id: params[:id])
  end

  def setting_params
    params.permit(:homepage_show, :email_notify)
  end
end