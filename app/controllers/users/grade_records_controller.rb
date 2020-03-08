class Users::GradeRecordsController < Users::BaseController
  before_action :private_user_resources!

  def show
    grades = observed_user.grades

    type = params[:type].to_s.strip
    grades =
      case type
      when 'income' then grades.where('score > 0')
      when 'cost'   then grades.where('score < 0')
      else grades
      end

    @count = grades.count
    @grade_records = paginate(grades.order(created_at: :desc))
  end
end