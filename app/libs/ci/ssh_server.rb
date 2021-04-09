module Ci::SSHServer
  class << self
    def config
      gitea_config = {}

      begin
        config = Rails.application.config_for(:configuration).symbolize_keys!
        ci_ssh_server = config[:ci_ssh_server].symbolize_keys!
        raise 'gitea config missing' if ci_ssh_server.blank?
      rescue => ex
        raise ex if Rails.env.production?

        puts %Q{\033[33m [warning] ci_ssh_server config or configuration.yml missing,
                 please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
        ci_ssh_server = {}
      end
      ci_ssh_server
    end
  end
end
