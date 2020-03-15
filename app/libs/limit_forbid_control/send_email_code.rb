class LimitForbidControl::SendEmailCode < LimitForbidControl::Base
  attr_reader :email

  def initialize(email)
    super()
    @email = email
  end

  def allow_times
    EduSetting.get('daily_send_email_code_times').presence || 5
  end

  def forbid_expires
    num = EduSetting.get('daily_send_email_code_forbid_time').presence.to_i
    num.zero? ? 10.minutes : num.to_i.hours
  end

  def cumulative_expires
    1.hours
  end

  def cache_key
    @_cache_key ||= "limit_forbid_control:#{day}:send_email_code:#{email}"
  end
end