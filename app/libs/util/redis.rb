module Util::Redis
  class << self
    def online_user_count
      if Rails.cache.is_a?(ActiveSupport::Cache::RedisStore)
        Rails.cache.data.scan(0, match: 'cache:_session_id:*', count: 100000).last.uniq.size
      end
    end
  end
end