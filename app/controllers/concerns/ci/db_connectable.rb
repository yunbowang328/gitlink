module Ci::DbConnectable
  extend ActiveSupport::Concern

  included do
  end

  # Dynamically sets the database connection.
  def connect_to_ci_database(options={})
    master_db = options[:master_db] || false
    config = Rails.application.config_for(:configuration).symbolize_keys!
    db_config = config[:ci_db_server].symbolize_keys!
    raise 'ci database config missing' if db_config.blank?

    req_params = {
      host: db_config[:host],
      username: db_config[:username],
      password: db_config[:password],
      port: db_config[:port]
    }
    req_params = req_params.merge(database: "#{current_user.login}_#{db_config[:database]}") unless master_db === true

    db_params = Ci::Database.get_connection_params(req_params)
    @connection = Ci::Database.set_connection(db_params).connection
  end

  def connect_to_trustie_ci_database(options={})
    master_db = options[:master_db] || false
    config = Rails.application.config_for(:configuration).symbolize_keys!
    db_config = config[:ci_db_server_trustie].symbolize_keys!
    raise 'ci database config missing' if db_config.blank?

    req_params = {
        host: db_config[:host],
        username: db_config[:username],
        password: db_config[:password],
        port: db_config[:port]
    }

    req_params = req_params.merge(database: "#{db_config[:database]}") unless master_db === true
    db_params = Ci::Database.get_connection_params(req_params)
    @trustie_db_connection = Ci::Database.set_connection(db_params).connection
  end

  def auto_create_database!(connection, database)
    Rails.logger.info "[CI::DbConnectable] auto_create_database's connection: #{connection}"
    connection.execute("CREATE DATABASE IF NOT EXISTS #{database}")
  end

  def auto_create_table_structure!(connection)
    Rails.logger.info "[CI::DbConnectable] auto_create_table_structure's connection: #{connection}"

    sqls = Ci::Schema.statement.split(';').map(&:strip).reject { |e| e.to_s.empty? }
    sqls.each do |sql|
      con_result = connection.execute(sql)
      Rails.logger.info "=============> ci create tabels result: #{con_result}"
    end
  end
end
