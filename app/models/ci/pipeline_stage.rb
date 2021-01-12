# == Schema Information
#
# Table name: ci_pipeline_stages
#
#  id          :integer          not null, primary key
#  stage_name  :string(255)      not null
#  stage_type  :string(255)      not null
#  pipeline_id :integer          not null
#  show_index  :integer          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Ci::PipelineStage < Ci::LocalBase

  validates :stage_name, presence: {message: "阶段名称不能为空"}
  validates :stage_type, presence: {message: "阶段类型不能为空"}

  belongs_to :pipeline, foreign_key: :pipeline_id, :class_name => 'Ci::Pipeline'
  has_many :pipeline_stage_steps, -> { reorder(show_index: :asc) }, foreign_key: "stage_id", :class_name => 'Ci::PipelineStageStep',  dependent: :destroy

  INIT_STAGES = {init:"初始化", build:"编译构建", deploy:"部署", confirm:"确认"}.freeze

end
