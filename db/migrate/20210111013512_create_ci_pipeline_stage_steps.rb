class CreateCiPipelineStageSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :ci_pipeline_stage_steps do |t|
      t.string :step_name, null: false, comment: '步骤名称'
      t.integer :stage_id, null: false, comment: '阶段id'
      t.integer :template_id, comment: '模板id'
      t.text :content
      t.integer :show_index, null: false, comment: '阶段排序', default: 0

      t.timestamps
    end
  end
end
