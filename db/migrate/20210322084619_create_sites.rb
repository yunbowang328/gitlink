class CreateSites < ActiveRecord::Migration[5.2]
  def change
    create_table :sites do |t|
      t.string :name, comment: "中文名称"
      t.string :url, comment: "具体链接"
      t.string :key, comment: "标识"
      t.integer :site_type, comment: "分类，按照分类编排链接"

      t.timestamps
    end

    Site.set_default_menu
  end
end
