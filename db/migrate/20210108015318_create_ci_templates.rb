class CreateCiTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :ci_templates do |t|
      t.string :template_name, null: false, comment: '模板名称'
      t.string :stage_type, null: false, comment: '模板所属阶段类型：init/build/deploy/customize/confirm'
      t.string :category, null: false, comment: '模板分类'
      t.text :content, null: false, comment: '模板yml内容'

      t.timestamps
    end
    add_index :ci_templates, [:stage_type]
  end
end

