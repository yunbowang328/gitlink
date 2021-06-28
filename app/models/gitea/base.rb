class Gitea::Base < ApplicationRecord
    db_config = Rails.configuration.database_configuration[Rails.env]["gitea_server"]
    raise 'gitea database config missing' if db_config.blank?

    establish_connection db_config
end
