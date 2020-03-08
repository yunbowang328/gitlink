class CreateLicenses < ActiveRecord::Migration[5.2]
  def change
    create_table :licenses do |t|
      t.string :name
      t.text :content

      t.timestamps
    end

    dir_url = File.join(Rails.root, "public", "options", "license")
    GenerateDbService.call(dir_url, 'license')

  end
end
