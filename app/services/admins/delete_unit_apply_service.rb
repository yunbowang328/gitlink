class Admins::DeleteUnitApplyService < ApplicationService

  attr_reader :department, :params

  def initialize(unit_apply, params)
    @unit_apply = unit_apply
    @params     = params
  end

  def call
    ActiveRecord::Base.transaction do
      @unit_apply.update_attribute("status",3)
      @unit_apply&.applied_messages&.update_all(status:3)
      @unit_apply&.school&.apply_add_departments&.update_all(status:3)

      applied_departments = ApplyAddDepartment.where(school_id: @unit_apply.school_id)
      applied_departments.update_all(status: 3)

      use_extensions = UserExtension&.where(school_id: @unit_apply.school_id)
      user_ids = UserExtension&.where(school_id: @unit_apply.school_id)&.pluck(:user_id)
      User.where(id: user_ids).update_all(profile_completed: false)
      use_extensions.update_all(school_id: nil,department_id: nil)

      @unit_apply&.user&.user_extension&.update_attribute("department_id", nil)

      # 申请了职业认证的用户撤销申请
      apply_user_auth = ApplyUserAuthentication.where(user_id: user_ids, auth_type: 2, status: 0)
      apply_user_auth.each do |apply|
        apply.tidings.destroy_all
        apply.update_attribute('status', 3)
        diskfile2 = disk_auth_filename('UserAuthentication', apply.user_id, 'PRO')
        diskfilePRO = diskfile2 + 'temp'
        File.delete(diskfilePRO) if File.exist?(diskfilePRO)
        File.delete(diskfile2) if File.exist?(diskfile2)
      end

      # 未审批删除
      if params[:tip] == "unapplied"
        Tiding.where(:user_id => 1, :trigger_user_id => @unit_apply.user_id, :container_id => @unit_apply.id, :container_type => 'ApplyAddSchools', :status => 0, :tiding_type => "Apply").update_all(status: 1)
        Tiding.create(:user_id => @unit_apply.user_id, :trigger_user_id => 0, :container_id => @unit_apply.id, :container_type =>'ApplyAddSchools', :belong_container_id => @unit_apply.school_id, :belong_container_type=> 'School', :tiding_type => "System", :status => 2, :extra => params[:reason])

        Tiding.where(:user_id => 1, :container_id => applied_departments.pluck(:id), :container_type => 'ApplyAddDepartment', :status => 0, :tiding_type => "Apply").update_all(status: 1)
        if applied_departments&.first.present?
          Tiding.create(:user_id => applied_departments.first.user_id, :trigger_user_id => 0, :container_id => applied_departments.first.id, :container_type =>'ApplyAddDepartment', :belong_container_id => @unit_apply.school_id, :belong_container_type=> 'School', :tiding_type => "System", :status => 2)
          AppliedMessage.create(:user_id => applied_departments.first.user_id, :status => 3, :viewed => 0, :applied_id => applied_departments.first.id, :applied_type => "ApplyAddDepartment", :name => applied_departments.first.name )
        end
        @unit_apply&.school&.destroy
        @unit_apply&.school&.departments&.destroy_all
      elsif params[:tip] == "applied"
        applied_departments.destroy_all
        @unit_apply.destroy
      end
    end

  end
end