class Users::ApplyProfessionalAuthService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    raise Error, '请先完善基本信息' unless user.profile_is_completed?

    Users::ApplyProfessionalAuthForm.new(params).validate!
    # raise Error, '您已经申请过职业认证了' if ApplyUserAuthentication.professional_auth.processing.exists?(user_id: user.id)

    extension = user.user_extension
    extension.school_id     = params[:school_id]
    extension.department_id = params[:department_id]
    extension.identity      = params[:identity]

    user.professional_certification = params[:identity] != "teacher"

    extra = params[:extra].to_s.strip.presence
    if extension.identity.to_s == 'student'
      extension.technical_title = nil
      extension.student_id      = extra
    else
      extension.technical_title = extra
      extension.student_id      = nil
    end

    ActiveRecord::Base.transaction do
      ApplyUserAuthentication.professional_auth.processing.where(user_id: user.id).destroy_all
      user.save!
      extension.save!

      apply = user.apply_user_authentication.create!(auth_type: 2, status: 0)

      Attachment.associate_container(params[:attachment_ids], apply.id, apply.class) if params[:attachment_ids]

      # move_image_file! unless params[:upload_image].to_s == 'false'
    end

    # sms_notify_admin
  end

  private

  def move_image_file!
    image_url = ApplicationController.helpers.disk_professional_auth_filename(user.id)
    temp_image_url = image_url + 'temp'

    FileUtils.mv(temp_image_url, image_url, force: true) if File.exist?(temp_image_url)
  rescue RuntimeError => ex
    Util.logger_error(ex)
    raise Error, '申请失败'
  ensure
    File.delete(temp_image_url) if File.exist?(temp_image_url)
  end

  def sms_notify_admin
    sms_cache = Rails.cache.read('apply_pro_certification')
    if sms_cache.nil?
      Gitlink::Sms.notify_admin(send_type: 'apply_pro_certification')
      Rails.cache.write('apply_pro_certification', 1, expires_in: 5.minutes)
    end
  rescue => ex
    Util.logger_error(ex)
  end
end