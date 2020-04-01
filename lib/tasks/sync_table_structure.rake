desc "Initialize the data table structure"

namespace :sync_table_structure do
  task import_csv: :environment do
    puts "init table structure......."

    system "mysql -uroot -poracle10g -h127.0.0.1 forge_development < #{Rails.root}/db/structure.sql"

    puts "init success"
  end
end
