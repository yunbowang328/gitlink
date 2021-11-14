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

    user.user_extension.assign_attributes(user_extension_attributes)

    old_login = user.login
    ActiveRecord::Base.transaction do
      user.save!
      user.user_extension.save!
      update_gitea_user(old_login)
    end

    user
  end

  private

  def user_attributes
    params.slice(*%i[lastname nickname mail phone admin business is_test login
                     professional_certification authentication is_shixun_marker])
  end

  def user_extension_attributes
    params.slice(*%i[gender identity technical_title student_id location location_city school_id department_id])
  end

  def gitea_user_params
    hash = {
      password: params[:password].to_s.presence,
      email: user.mail,
      login_name: params[:login].to_s.presence,
      admin: boolean_admin
    }.compact

    hash.delete_if {|_,v| v.to_s.strip == ''}
  end

  def boolean_admin
    admin = params[:admin].to_s.presence
    case admin
    when "0" then false
    when "1" then true
    end
  end

  def update_gitea_user(old_login)
    return if user.gitea_uid.blank?

    Gitea::User::UpdateInteractor.call(old_login, gitea_user_params)
  rescue Exception => ex
    Util.logger_error(ex)
    raise Error, '保存失败'
  end
end