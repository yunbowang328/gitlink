class CreateAddDepartmentApplyService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    name = params[:name].to_s.strip
    raise Error, '名称不能为空' if name.blank?

    school = School.find_by(id: params[:school_id])
    raise Error, '学校/单位不存在' if school.blank?
    raise Error, '部门已存在' if school.departments.exists?(name: name)

    department = Department.new
    department.name   = name
    department.school = school

    ActiveRecord::Base.transaction do
      department.save!

      attrs = {
        user_id: user.id, department: department, school: school,
        name: department.name, remarks: params[:remarks], status: 0,
      }
      apply = ApplyAddDepartment.create!(attrs)

      unless user.professional_certification?
        user.user_extension.update!(department_id: department.id)
      end

      # 向管理员发送通知
      message = AppliedMessage.new(user_id: 1, status: 0, applied_user_id: user.id, viewed: 0,
                                   applied_id: apply.id, applied_type: 'ApplyAddDepartment', name: department.name)
      message.save(validate: false)
    end

    department
  end
end
