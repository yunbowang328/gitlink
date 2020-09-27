module Gitea
  class Database < ActiveRecord::Base
    self.abstract_class = true

    def self.set_connection
      gitea_server_config = Rails.configuration.database_configuration[Rails.env]["gitea_server"]
      raise 'gitea database config missing' if gitea_server_config.blank?

      establish_connection gitea_server_config
    end
  end
end
