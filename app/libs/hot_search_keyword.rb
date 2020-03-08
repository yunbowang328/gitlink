# 基于Redis实现热门搜索关键字
class HotSearchKeyword
  class << self
    def add(keyword)
      return if keyword.blank?
      Rails.logger.info("[Hot Keyword] #{keyword} score increment ~")
      Rails.cache.data.zincrby(redis_key, 1, keyword)
    end

    def hot(limit = 5)
      Rails.cache.data.zrevrange(redis_key, 0, limit - 1)
    end

    def available?
      Rails.cache.is_a?(ActiveSupport::Cache::RedisStore)
    end

    private

    def redis_key
      'educoder:es:hot_keyword'
    end
  end
end