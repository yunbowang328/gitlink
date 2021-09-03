class CreateReversedKeywords < ActiveRecord::Migration[5.2]
  def change
    create_table :reversed_keywords do |t|
      t.string :identifier, comment: '保留关键字'
      t.text :description, comment: '描述'
      t.boolean :closed, default: false, comment: '是否关闭'

      t.timestamps
    end
  end
end
