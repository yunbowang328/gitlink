desc "create mulan mirror repository"
namespace :create_mulan_repo do 
  task init: :environment do 
    doc = SimpleXlsxReader.open("#{Rails.root}/public/mulan_repo.xlsx")
    data = doc.sheets.first.rows
  end
end