module Ci::DbConnectable
  extend ActiveSupport::Concern

  include do
  end

  # Dynamically sets the database connection.
  def connect_to_ci_database
    config = Rails.application.config_for(:configuration).symbolize_keys!
    db_config = config[:ci_db_server].symbolize_keys!
    raise 'ci database config missing' if db_config.blank?

    req_params = {
      host: db_config["host"],
      username: db_config['username'],
      password: db_config['password'],
      port: db_config['port'],
      database: "#{current_user.login}_drone"
    }
    db_params = Ci::Database.get_connection_params(req_params)
    Ci::Database.set_connection(db_params)
  end

end
