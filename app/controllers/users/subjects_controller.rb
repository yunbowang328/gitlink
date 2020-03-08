class Users::SubjectsController < Users::BaseController
  def index
    subjects = Users::SubjectService.new(observed_user, query_params).call

    subjects = subjects.where(id: current_laboratory.subjects)

    @count = subjects.count
    @subjects = paginate(subjects.includes(:user, :repertoire), special: observed_user.is_teacher?)
  end

  private

  def query_params
    params.permit(:category, :status, :sort_direction)
  end
end