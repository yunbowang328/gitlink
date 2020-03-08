class Admins::DepartmentAppliesController < Admins::BaseController

  before_action :get_apply,only:[:agree,:destroy]

  def index
    params[:status] ||= 0
    params[:sort_by] = params[:sort_by].presence || 'created_at'
    params[:sort_direction] = params[:sort_direction].presence || 'desc'
    applies = Admins::DepartmentApplyQuery.call(params)
    @depart_applies = paginate applies.preload(:school,user: :user_extension)
  end

  def agree
    ActiveRecord::Base.transaction do
      @depart_apply.update_attribute("status",1)
      @depart_apply&.applied_messages&.update_all(status:1)
      @depart_apply&.department&.update_attribute("is_auth",1)
      @depart_apply&.user&.user_extension&.update_attribute("department_id",@depart_apply.department_id)
      render_success_js
    end
  end

  def merge
    apply_id = params[:origin_department_id]
    apply_add =ApplyAddDepartment.find(apply_id)
    origin_id = apply_add&.department_id
    new_id = params[:department_id]

    return render_error('请选择其它部门') if origin_id.to_s == new_id.to_s

    origin_department = apply_add&.department
    to_department = Department.find(new_id)

    return render_error('部门所属单位不相同') if origin_department&.school_id != to_department&.school_id

    ActiveRecord::Base.transaction do
      applied_message = AppliedMessage.where(applied_id: origin_id, applied_type: "ApplyAddDepartment")

      applied_message.update_all(:status => 4)
      apply_add.update_attribute(:status, 2)
      apply_add.tidings.update_all(:status => 1)

      extra = to_department&.name + "(#{apply_add&.department&.school&.try(:name)})"
      tiding_params = {
        user_id: apply_add.user_id,
        trigger_user_id: 0,
        container_id: apply_add.id,
        container_type: 'ApplyAddDepartment',
        belong_container_id: apply_add&.department&.school_id,
        belong_container_type: "School",
        tiding_type: "System",
        status: 3,
        extra: extra
      }
      Tiding.create(tiding_params)

      origin_department.apply_add_departments.delete_all

      origin_department.user_extensions.update_all(department_id: new_id)

      if to_department.identifier.blank? && origin_department.identifier.present?
        to_department.update!(identifier: origin_department.identifier)
      end

      origin_department.destroy!
      apply_add.destroy!
    end
    render_ok
  end

  def destroy
    ActiveRecord::Base.transaction do
      @depart_apply.update_attribute("status",3)
      @depart_apply&.applied_messages&.update_all(status:3)

      if params[:tip] == 'unapplied'   #未审批时候删除
        user_extens = UserExtension.where(department_id: @depart_apply.department_id)
        user_extens.update_all(department_id:nil)
        User.where(id: user_extens.pluck(:user_id)).update_all(profile_completed:false)

        tiding_params = {
          user_id: @depart_apply.user_id,
          trigger_user_id: 0,
          container_id: @depart_apply.id,
          container_type: 'ApplyAddDepartment',
          belong_container_id: @depart_apply&.department&.school_id,
          belong_container_type: "School",
          tiding_type: "System",
          status: 2,
          extra: params[:reason]
        }
        Tiding.create(tiding_params)
      end

      @depart_apply&.department&.destroy
      @depart_apply.destroy
      render_success_js
    end
  end

  private

  def get_apply
    @depart_apply = ApplyAddDepartment.find_by(id:params[:id])
  end
end
