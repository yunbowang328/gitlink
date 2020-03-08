OmniAuth.config.add_camelization 'qq', 'QQ'
OmniAuth.config.logger = Rails.logger
OmniAuth.config.on_failure = Proc.new { |env|
  OmniAuth::FailureEndpoint.new(env).redirect_to_failure
}

oauth_config = {}
begin
  config = Rails.application.config_for(:configuration)
  oauth_config = config.dig('oauth', 'qq')
  raise 'oauth qq config missing' if oauth_config.blank?
rescue => ex
  raise ex if Rails.env.production?

  puts %Q{\033[33m [warning] qq oauth config or configuration.yml missing,
           please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
end

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :qq, oauth_config['appid'], oauth_config['secret'], { provider_ignores_state: true }
end
