class CreatePhengleiUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :phenglei_users do |t|
      t.string :phone 

      t.timestamps
    end
    doc = SimpleXlsxReader.open("#{Rails.root}/public/phenglei_user.xlsx")
    data = doc.sheets.first.rows
    data.each_with_index do |i, index|
      next if index == 0 || i[1].nil?
      PhengleiUser.find_or_create_by(phone: i[1])
    end
  end
end
