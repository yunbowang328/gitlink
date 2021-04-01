oauth_config = {}
begin
  config = Rails.application.config_for(:configuration)
  oauth_config = config.dig('oauth', 'educoder')
  raise 'oauth educoder config missing' if oauth_config.blank?
rescue => ex
  raise ex if Rails.env.production?

  puts %Q{\033[33m [warning] wechat oauth config or configuration.yml missing,
           please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
end

EducoderOauth.client_id = oauth_config['client_id']
EducoderOauth.client_secret = oauth_config['client_secret']
EducoderOauth.base_url = oauth_config['base_url']
