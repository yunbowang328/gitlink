class Users::ApplyAuthenticationService < ApplicationService
  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    raise Error, '请先完善基本信息' unless user.profile_is_completed?

    Users::ApplyAuthenticationForm.new(params).validate!
    # raise Error, '您已经申请过实名认证了' if ApplyUserAuthentication.real_name_auth.processing.exists?(user_id: user.id)

    user.lastname  = params[:name].to_s.strip
    user.firstname = ''
    user.ID_number = params[:id_number].to_s.strip.presence
    user.show_realname = params[:show_realname].to_s == 'true' if params[:show_realname].to_s.present?

    ActiveRecord::Base.transaction do
      ApplyUserAuthentication.real_name_auth.processing.where(user_id: user.id).destroy_all

      user.authentication = true
      user.save!

      user.user_extension.update!(gender: params[:gender].to_i) if params[:gender].present?

      apply = user.apply_user_authentication.create!(auth_type: 1, status: 0)

      Attachment.associate_container(params[:attachment_ids], apply.id, apply.class) if params[:attachment_ids]

        # move_image_file! unless params[:upload_image].to_s == 'false'
    end

    # sms_notify_admin

    user
  end

  private

  def move_image_file!
    image_url = ApplicationController.helpers.disk_real_name_auth_filename(user.id)
    temp_image_url = image_url + 'temp'

    FileUtils.mv(temp_image_url, image_url, force: true) if File.exist?(temp_image_url)
  rescue RuntimeError => ex
    Util.logger_error(ex)
    raise Error, '申请失败'
  ensure
    File.delete(temp_image_url) if File.exist?(temp_image_url)
  end

  def sms_notify_admin
    Educoder::Sms.notify_admin(send_type: 'apply_auth')
  rescue => ex
    Util.logger_error(ex)
  end
end