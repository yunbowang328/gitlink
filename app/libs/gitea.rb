module Gitea
  class << self
    def gitea_config
      gitea_config = {}

      begin
        config = Rails.application.config_for(:configuration).symbolize_keys!
        gitea_config = config[:gitea].symbolize_keys!
        raise 'gitea config missing' if gitea_config.blank?
      rescue => ex
        raise ex if Rails.env.production?

        puts %Q{\033[33m [warning] gitea config or configuration.yml missing,
                 please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
        gitea_config = {}
      end
      gitea_config
    end
  end
end
