class CreateIgnores < ActiveRecord::Migration[5.2]
  def change
    create_table :ignores do |t|
      t.string :name
      t.text :content

      t.timestamps
    end

    dir_url = File.join(Rails.root, "public", "options", "gitignore")
    GenerateDbService.call(dir_url, 'ignore')

  end
end
