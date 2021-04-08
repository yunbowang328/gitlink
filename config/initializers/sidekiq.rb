redis_config = Rails.application.config_for(:redis)
sidekiq_url = redis_config["url"] || 'redis://localhost:6379/0'

Sidekiq.configure_server do |config|
  config.redis = { url: sidekiq_url }

  schedule_file = "config/sidekiq_cron.yml"
  if File.exists?(schedule_file)
    Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
  end
end

Sidekiq.configure_client do |config|
  config.redis = { url: sidekiq_url }
end
