class Users::CoursesController < Users::BaseController
  def index
    courses = Users::CourseService.new(observed_user, query_params).call

    courses = courses.where(id: current_laboratory.all_courses)

    @count = courses.count
    @courses = paginate(courses.includes(teacher: { user_extension: :school }), special: observed_user.is_teacher?)
  end

  private

  def query_params
    params.permit(:category, :status, :sort_direction)
  end
end