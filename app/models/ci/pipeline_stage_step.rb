# == Schema Information
#
# Table name: ci_pipeline_stage_steps
#
#  id          :integer          not null, primary key
#  step_name   :string(255)      not null
#  stage_id    :integer          not null
#  template_id :integer
#  content     :text(65535)
#  show_index  :integer          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Ci::PipelineStageStep < Ci::LocalBase

  validates :step_name, presence: {message: "步骤名称不能为空"}
  validates :stage_id, presence: {message: "阶段id不能为空"}

  belongs_to :pipeline_stage, foreign_key: :stage_id, :class_name => 'Ci::PipelineStage'
  has_one :template, :class_name => 'Ci::Template', foreign_key: :template_id
end
