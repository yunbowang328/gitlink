class LimitForbidControl::UserLogin < LimitForbidControl::Base
  attr_reader :user

  def initialize(user)
    super()
    @user = user
  end

  def allow_times
    EduSetting.get('daily_error_password_times').presence || 5
  end

  def forbid_expires
    num = EduSetting.get('daily_error_password_forbid_time').presence.to_i
    num.zero? ? 1.hours : num.to_i.minutes
  end

  def cumulative_expires
    1.days
  end

  def cache_key
    @_cache_key ||= "limit_forbid_control:#{day}:user_login:#{user.id}"
  end
end