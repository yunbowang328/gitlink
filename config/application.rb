require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Educoderplus
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    #
    #
    # config.educoder = config_for(:configuration)

    config.active_record.default_timezone = :utc
    config.time_zone = 'Beijing'

    # I18n
    config.i18n.default_locale = 'zh-CN'
    config.i18n.load_path += Dir[Rails.root.join('config/locales', '**', '*.yml').to_s]

    # job
    config.active_job.queue_adapter = :sidekiq

    config.middleware.use OmniAuth::Builder do
      provider :cas, url: 'https://urp.tfswufe.edu.cn/cas'
    end

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        # location of your api
        resource '/*', :headers => :any, :methods => [:get, :post, :delete, :options, :put]
      end
    end
  end
end
