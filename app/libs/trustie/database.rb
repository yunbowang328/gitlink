module Trustie 
  class Database < ActiveRecord::Base
    self.abstract_class = true

    def self.set_connection
      trustie_server_config = Rails.configuration.database_configuration[Rails.env]["trustie_web_server"]
      raise 'trustie database config missing' if trustie_server_config.blank?

      establish_connection trustie_server_config
    end
  end
end