redis_config = Rails.application.config_for(:redis)
cache_url = redis_config["url"] || 'redis://localhost:6379'
$redis_cache = Redis.new(url: cache_url, db: 2)