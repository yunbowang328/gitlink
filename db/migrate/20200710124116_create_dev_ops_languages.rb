class CreateDevOpsLanguages < ActiveRecord::Migration[5.2]
  def change
    create_table :dev_ops_languages do |t|
      t.string :name, null: false, comment: 'The name of project language.'
      t.text :content, null: false, comment: 'The content of project language.'
      t.integer :usage_amount, default: 0, comment: 'number of people Using the language'

      t.timestamps
    end
  end
end
