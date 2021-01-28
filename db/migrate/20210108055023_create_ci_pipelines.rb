class CreateCiPipelines < ActiveRecord::Migration[5.2]
  def change
    create_table :ci_pipelines do |t|
      t.string :pipeline_name, null: false, comment: '流水线名称'
      t.string :pipeline_status, null: false, comment: 'successed/failed/running/errored/pending/killed/unknown' , default: 'unknown'
      t.string :file_name, null: false, comment: '文件名称'

      t.timestamps
    end
  end
end
