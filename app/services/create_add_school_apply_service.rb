class CreateAddSchoolApplyService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    AddSchoolApplyForm.new(params).validate!

    name = params[:name].to_s.strip
    raise Error, '学校/单位已经存在' if name.present? && School.exists?(name: name)

    school = School.new
    school.name     = name
    school.province = params[:province].to_s.strip
    school.city     = params[:city].to_s.strip
    school.address  = params[:address].to_s.strip

    ActiveRecord::Base.transaction do
      school.save!

      school_attrs = school.as_json(only: %i[name province city address])
      ApplyAddSchool.create!(school_attrs.merge(school: school, user_id: user.id, remarks: params[:remarks]))

      # 向管理员发送通知
      message = AppliedMessage.new(user_id: 1, status: 0, applied_user_id: user.id, viewed: 0,
                                   applied_id: school.id, applied_type: 'ApplyAddSchools', name: school.name)
      message.save(validate: false)
    end

    school
  end
end
