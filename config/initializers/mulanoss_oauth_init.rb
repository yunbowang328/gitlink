oauth_config = {}
begin
  config = Rails.application.config_for(:configuration)
  oauth_config = config.dig('oauth', 'mulan')
  raise 'oauth educoder config missing' if oauth_config.blank?
rescue => ex
  raise ex if Rails.env.production?

  puts %Q{\033[33m [warning] wechat oauth config or configuration.yml missing,
           please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
end

MulanossOauth.client_id = oauth_config['client_id']
MulanossOauth.client_secret = oauth_config['client_secret']
MulanossOauth.base_url = oauth_config['base_url']
MulanossOauth.redirect_uri = oauth_config['redirect_uri']
