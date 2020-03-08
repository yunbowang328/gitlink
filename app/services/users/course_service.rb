class Users::CourseService
  include CustomSortable

  sort_columns :created_at, :updated_at, default_by: :updated_at, default_direction: :desc

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    courses = category_scope_courses.not_deleted.not_excellent

    courses = status_filter(courses)

    custom_sort(courses, params[:sort_by], params[:sort_direction])
  end

  private

  def category_scope_courses
    case params[:category]
    when 'study' then
      user.as_student_courses.started
    when 'manage' then
      user.manage_courses
    else
      ids = user.as_student_courses.started.pluck(:id) + user.manage_courses.pluck(:id)
      Course.where(id: ids)
    end
  end

  def status_filter(relations)
    # 只有自己查看才有过滤
    return relations unless observed_logged_user?

    case params[:status]
    when 'processing' then
      relations.processing
    when 'end' then
      relations.ended
    else
      relations
    end
  end

  def observed_logged_user?
    User.current.id == user.id
  end
end
