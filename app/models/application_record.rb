class ApplicationRecord < ActiveRecord::Base
  include NumberDisplayHelper

  attr_accessor :_extra_data

  self.abstract_class = true

  def format_time(time)
    time.present? ? time.strftime('%Y-%m-%d %H:%M') : ''
  end

  def display_extra_data(key)
    _extra_data&.[](key)
  end

  def allow_sync_to_trustie?
    Rails.env.production? && EduSetting.get('host_name') == 'https://www.educoder.net'
  end

  def reset_user_cache_async_job(user)
    ResetUserCacheJob.perform_later(user)
  end

  def reset_platform_cache_async_job
    ResetPlatformCacheJob.perform_later
  end
end
