module OauthEducoder
  class << self
    def config
      educoder_config = {}

      begin
        config = Rails.application.config_for(:configuration).symbolize_keys!
        educoder_config = config[:oauth][:educoder].symbolize_keys!
        raise 'oauth educoder config missing' if educoder_config.blank?
      rescue => ex
        raise ex if Rails.env.production?

        puts %Q{\033[33m [warning] educoder config or configuration.yml missing,
                 please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
        educoder_config = {}
      end
      educoder_config
    end
  end
end
