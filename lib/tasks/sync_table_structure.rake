desc "Initialize the data table structure"

namespace :sync_table_structure do
  task import_csv: :environment do
    puts "init table structure......."

    database_config = Rails.configuration.database_configuration

    database = database_config[Rails.env]["database"]
    database_username = database_config[Rails.env]["username"]
    database_password = database_config[Rails.env]["password"]
    database_host = database_config[Rails.env]["host"]
    database_port = database_config[Rails.env]["port"] || 3306

    puts "bash: mysql -u#{database_username} -p#{database_password} -P#{database_port} -h#{database_host} #{database}"

    system "mysql -u#{database_username} -p#{database_password} -P#{database_port} -h#{database_host} #{database} < #{Rails.root}/db/structure.sql"

    puts "init success"
  end
end
