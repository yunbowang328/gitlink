class CreateCiPipelineStages < ActiveRecord::Migration[5.2]
  def change
    create_table :ci_pipeline_stages do |t|
      t.string :stage_name, null: false, comment: '阶段名称'
      t.string :stage_type, null: false, comment: '阶段类型：init/build/deploy/customize/confirm'
      t.integer :pipeline_id, null: false, comment: '阶段所属流水线id'
      t.integer :show_index, null: false, comment: '阶段排序', default: 0

      t.timestamps
    end
  end
end
