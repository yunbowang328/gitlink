wechat_config = {}
weapp_config = {}

begin
  config = Rails.application.config_for(:configuration)
  wechat_config = config['wechat']
  weapp_config = config['weapp']
  raise 'wechat config missing' if wechat_config.blank?
  raise 'weapp config missing' if weapp_config.blank?
rescue => ex
  raise ex if Rails.env.production?

  puts %Q{\033[33m [warning] wechat config or configuration.yml missing,
           please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
  wechat_config = {}
  weapp_config = {}
end

# 网站应用
Wechat::OfficialAccount.appid  = wechat_config['appid']
Wechat::OfficialAccount.secret = wechat_config['secret']

# 小程序
Wechat::Weapp.appid  = weapp_config['appid']
Wechat::Weapp.secret = weapp_config['secret']
