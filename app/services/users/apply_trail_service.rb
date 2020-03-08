class Users::ApplyTrailService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :remote_ip, :params

  def initialize(user, params)
    @user      = user
    @remote_ip = params.delete(:remote_ip)
    @params    = params
  end

  def call
    Users::ApplyTrailForm.new(params.merge(user: user)).validate!

    ActiveRecord::Base.transaction do
      bind_user_phone! unless user.phone_binded?

      apply = ApplyAction.find_or_initialize_by(user_id: user.id, container_type: 'TrialAuthorization', status: 0)
      apply.assign_attributes(ip_addr: remote_ip, apply_reason: params[:reason]) if apply.new_record?

      # 自动授权
      if auto_authorization_school_student?
        user.update!(certification: 1)

        apply.status = 1
      # else
      #   sms_cache = Rails.cache.read("apply_auth")
      #   if sms_cache.nil?
      #     send_trial_apply_notify!
      #     Rails.cache.write("apply_auth", 1, expires_in: 5.minutes)
      #   end
      end
      apply.save!
    end

    user
  end

  private

  def bind_user_phone!
    code = VerificationCode.where(phone: params[:phone], code: params[:code], code_type: 4).last

    raise Error, '无效的验证码' if code.blank? || !code.effective?

    user.update!(phone: params[:phone])
  end

  def auto_authorization_school_student?
    user.user_extension&.student? && School.exists?(auto_users_trial: true, id: user.user_extension&.school_id)
  end

  def send_trial_apply_notify!
    Educoder::Sms.notify_admin(send_type:'user_apply_auth')
  rescue => ex
    Rails.logger.error('发送通知管理员短信失败')
    Rails.logger.error(ex.message)
    ex.backtrace.each { |msg| Rails.logger.error(msg) }
  end
end