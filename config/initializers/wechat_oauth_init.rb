oauth_config = {}
begin
  config = Rails.application.config_for(:configuration)
  oauth_config = config.dig('oauth', 'wechat')
  raise 'oauth wechat config missing' if oauth_config.blank?
rescue => ex
  raise ex if Rails.env.production?

  puts %Q{\033[33m [warning] wechat oauth config or configuration.yml missing,
           please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
end

WechatOauth.appid    = oauth_config['appid']
WechatOauth.secret   = oauth_config['secret']
WechatOauth.scope    = oauth_config['scope']
WechatOauth.base_url = oauth_config['base_url']
WechatOauth.logger   = Rails.logger
