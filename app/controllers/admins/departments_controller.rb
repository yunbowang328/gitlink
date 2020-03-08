class Admins::DepartmentsController < Admins::BaseController

  helper_method :current_department

  def index
    params[:sort_by] ||= 'created_at'
    params[:sort_direction] ||= 'desc'

    departments = Admins::DepartmentQuery.call(params)

    @departments = paginate departments.preload(:school, :member_users)

    department_ids = @departments.map(&:id)
    @users_count = UserExtension.where(department_id: department_ids).group(:department_id).count
    @professional_auth_count = UserExtension.where(department_id: department_ids)
                                 .joins(:user).where(users: { professional_certification: true })
                                 .group(:department_id).count
  end

  def create
    department_name = params[:department_name].to_s.strip
    school = School.find(params[:school_id])

    return render_error('部门名称重复') if school.departments.exists?(name: department_name)

    ActiveRecord::Base.transaction do
      department = school.departments.create!(name: department_name, is_auth: 1)
      ApplyAddDepartment.create!(school_id: school.id, status: 1, name: department.name,
                                 department_id: department.id, user_id: current_user.id)
    end

    render_ok
  end

  def edit
  end

  def update
    identifier = update_params.delete(:identifier).presence
    if identifier && Department.where.not(id: current_department.id).exists?(identifier: identifier)
      return render_error('统计链接重复', type: :notify)
    end

    current_department.update!(update_params.merge(identifier: identifier))
  end

  def destroy
    ActiveRecord::Base.transaction do
      current_department.apply_add_departments.update_all(status: 2)

      user_ids = current_department.user_extensions.pluck(:user_id)
      if user_ids.present?
        DeleteDepartmentNotifyJob.perform_later(current_department.id, 0, user_ids)
        current_department.soft_delete!
      else
        current_department.destroy!
      end
    end

    render_delete_success
  end

  def merge
    return render_error('请选择其它部门') if params[:origin_department_id].to_s == params[:department_id].to_s

    origin_department = Department.find(params[:origin_department_id])
    to_department = Department.find(params[:department_id])

    return render_error('部门所属单位不相同') if origin_department.school_id != to_department.school_id

    ActiveRecord::Base.transaction do
      origin_department.apply_add_departments.delete_all

      origin_department.user_extensions.update_all(department_id: to_department.id)

      if to_department.identifier.blank? && origin_department.identifier.present?
        to_department.update!(identifier: origin_department.identifier)
      end

      origin_department.destroy!
    end

    render_ok
  end

  private

  def current_department
    @_current_department ||= Department.find(params[:id])
  end

  def update_params
    params.require(:department).permit(:name, :identifier, :host_count)
  end
end