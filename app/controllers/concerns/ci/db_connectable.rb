module Ci::DbConnectable
  extend ActiveSupport::Concern

  include do
  end

  # Dynamically sets the database connection.
  def connect_to_ci_database(master_db=false)
    config = Rails.application.config_for(:configuration).symbolize_keys!
    db_config = config[:ci_db_server].symbolize_keys!
    raise 'ci database config missing' if db_config.blank?

    req_params = {
      host: db_config[:host],
      username: db_config[:username],
      password: db_config[:password],
      port: db_config[:port],
      database: master_db === true ? db_config[:database] : "#{current_user.login}_#{db_config[:database]}"
    }
    db_params = Ci::Database.get_connection_params(req_params)
    @connection = Ci::Database.set_connection(db_params)
  end

  def ci_db_structure!(connection, database)
    result = connection.execute("CREATE DATABASE #{database}")
    return false unless result.present?

    # Ci::Schema.execute(username, password, port, host, database)
    # con_result = @connection.execute(Ci::Schema.statement)

    Ci::Schema.statement.split(';').map(&:strip).each do |sql|
      con_result = @connection.execute(sql)
      Rails.logger.info "=============> ci create tabels result: #{con_result}"
    end
  end
end
