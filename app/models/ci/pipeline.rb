# == Schema Information
#
# Table name: ci_pipelines
#
#  id              :integer          not null, primary key
#  pipeline_name   :string(255)      not null
#  file_name       :string(255)      not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  pipeline_status :string(50)       default("unknown"), not null
#  login           :string(255)
#  sync            :integer          default("0"), not null
#  identifier      :string(11)
#  branch          :string(255)
#  event           :string(255)
#  sha             :string(255)
#

class Ci::Pipeline < Ci::LocalBase
  validates :pipeline_name, presence: {message: "流水线名称不能为空"}
  validates :file_name, presence: {message: "流水线文件名称不能为空"}
  validates :identifier, presence: {message: "项目identifier不能为空"}

  has_many :pipeline_stages, -> { reorder(show_index: :asc) }, foreign_key: "pipeline_id", :class_name => 'Ci::PipelineStage',  dependent: :destroy

  attr_accessor :last_build_time

end
