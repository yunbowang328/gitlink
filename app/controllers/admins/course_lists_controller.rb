class Admins::CourseListsController < Admins::BaseController

  def index
    course_lists = Admins::CourseListQuery.call(params)
    @course_lists = paginate course_lists.preload(:courses, :user)
    @params_page = params[:page] || 1
    respond_to do |format|
      format.js
      format.html
    end
  end

  def destroy
    CourseList.find(params[:id]).destroy!

    render_delete_success
  end

  def merge
    origin_course_list = CourseList.find_by!(id: params[:origin_course_list_id])
    o_courselist = CourseList.find_by(name: params[:course_list_name])
    if o_courselist
      origin_course_list.courses.each do |course|
        course.update!(name: course.name.sub(origin_course_list.name, params[:course_list_name]), course_list_id: o_courselist.id)
      end
      origin_course_list.destroy
    else
      origin_course_list.courses.each do |course|
        course.update!(name: course.name.sub(origin_course_list.name, params[:course_list_name]))
      end
      origin_course_list.update!(name: params[:course_list_name])
    end
    render_ok
  end
end