class Admins::UpdateUserService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    user.assign_attributes(user_attributes)
    user.mail = params[:mail].to_s.presence
    user.phone = params[:phone].to_s.presence
    user.firstname = ''
    user.password = params[:password] if params[:password].present?

    if params[:identity].to_s == 'student'
      params[:technical_title] = nil
    else
      params[:student_id] = nil
    end
    user.user_extension.assign_attributes(user_extension_attributes)

    ActiveRecord::Base.transaction do
      user.save!
      user.user_extension.save!
      user.update!(is_shixun_marker: true) if user.is_certification_teacher

      update_gitlab_password if params[:password].present?
    end

    user
  end

  private

  def user_attributes
    params.slice(*%i[lastname nickname mail phone admin business is_test
                     professional_certification authentication is_shixun_marker])
  end

  def user_extension_attributes
    params.slice(*%i[gender identity technical_title student_id location location_city school_id department_id])
  end

  def update_gitlab_password
    return if user.gid.blank?
    # 同步修改gitlab密码
    Gitlab.client.edit_user(user.gid, password: params[:password])
  rescue Exception => ex
    Util.logger_error(ex)
    raise Error, '保存失败'
  end
end