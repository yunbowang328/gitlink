class Admins::DepartmentMembersController < Admins::BaseController

  helper_method :current_department

  def create
    Admins::AddDepartmentMemberService.call(current_department, params)
    current_department.reload
  end

  def destroy
    @member = current_department.department_members.find_by(user_id: params[:user_id])
    @member.destroy! if @member.present?
  end

  private

  def current_department
    @_current_department ||= Department.find(params[:department_id])
  end
end