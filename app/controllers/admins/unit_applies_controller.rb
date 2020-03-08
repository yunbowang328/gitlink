class Admins::UnitAppliesController < Admins::BaseController
  before_action :get_apply,only: [:agree,:destroy,:edit,:update]

  def index
    params[:sort_by] ||= 'created_at'
    params[:sort_direction] ||= 'desc'
    unit_applies = Admins::UnitApplyQuery.call(params)
    @unit_applies = paginate unit_applies.preload(:school, :user)
  end

  def agree
    ActiveRecord::Base.transaction do
      begin
        @unit_apply.update_attribute("status",1)
        @unit_apply&.applied_messages&.update_all(status:1)
        @unit_apply&.school&.update_attribute("province",@unit_apply.province)

        # #申请信息的创建
        apply_message_params = {
          user_id: @unit_apply&.user_id,
          status: 1,
          viewed: 0,
          applied_id: @unit_apply.school_id,
          applied_type: "ApplyAddSchools",
          name: @unit_apply.name,
        }
        AppliedMessage.new(apply_message_params).save(validate: false)

        Tiding.where(user_id: 1, trigger_user_id: @unit_apply.user_id, container_id: @unit_apply.id,
                     container_type: 'ApplyAddSchools', status: 0, tiding_type: "Apply").update_all(status: 1)
        #消息的创建
        tiding_params = {
          user_id: @unit_apply.user_id,
          trigger_user_id: 0,
          container_id: @unit_apply.id,
          container_type: 'ApplyAddSchools',
          belong_container_id: @unit_apply.school_id,
          belong_container_type: "School",
          tiding_type: "System",
          status: 1
        }
        Tiding.create(tiding_params)
        render_success_js
      rescue Exception => e
        Rails.logger.info("############_________________#########{e}")
      end
    end
  end

  def destroy
    Admins::DeleteUnitApplyService.call(@unit_apply, params)
    render_success_js
  end

  def edit
    @all_schools = School.where.not(id: @unit_apply.school_id).pluck("name","id")

  end

  def update
    school = School.find_by(id: params[:school_id])
    ActiveRecord::Base.transaction do
      @unit_apply&.applied_messages&.update_all(status:4)
      Tiding.where(user_id: 1, trigger_user_id: @unit_apply.user_id, container_id: @unit_apply.id,
                   container_type: 'ApplyAddSchools', status: 0, tiding_type: "Apply").update_all(status: 1)

      #消息的创建
      tiding_params = {
        user_id: @unit_apply.user_id,
        trigger_user_id: 0,
        container_id: @unit_apply.id,
        container_type: 'ApplyAddSchools',
        belong_container_id: params[:school_id],
        belong_container_type: "School",
        tiding_type: "System",
        status: 3,
        extra: school.try(:name).to_s
      }
      Tiding.create(tiding_params)

      UserExtension.where(school_id: @unit_apply.school_id).update_all(school_id: params[:school_id].to_i)
      ApplyAddDepartment.where(:school_id => @unit_apply.school_id).update_all(school_id: params[:school_id].to_i)

      # 判断重复
      before_apply_departments = Department.where(school_id: @unit_apply.school_id)
      before_apply_departments.each do |department|
        after_dep = Department.where(school_id: params[:school_id].to_i, name: department.name)&.first
        if after_dep.present?
          UserExtension.where(school_id: @unit_apply.school_id, department_id: department.id).update_all(department_id: after_dep.id)
          department.destroy
          department.apply_add_departments.destroy_all
        else
          department.apply_add_departments.update_all(school_id: school.id)
          department.update_attribute(:school_id, school.id)
        end
      end

      @unit_apply&.school&.destroy
      apply_params = {
        status: 2,
        name: school&.name.to_s,
        school_id: params[:school_id],
        province: params[:province],
        city: params[:city],
        address: params[:address]
      }
      @unit_apply.update_attributes(apply_params)
      # render_success_js
    end
  end

  private

  def get_apply
    @unit_apply = ApplyAddSchool.find_by(id:params[:id])
  end

  def disk_auth_filename(source_type, source_id, type)
    File.join(storage_path, "#{source_type}", "#{source_id}#{type}")
  end
end

