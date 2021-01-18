# == Schema Information
#
# Table name: ci_templates
#
#  id              :integer          not null, primary key
#  template_name   :string(255)      not null
#  stage_type      :string(255)      not null
#  category        :string(255)      not null
#  content         :text(65535)      not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  parent_category :string(255)
#
# Indexes
#
#  index_ci_templates_on_stage_type  (stage_type)
#

class Ci::Template < Ci::LocalBase
  validates :template_name, presence: {message: "模板名称不能为空"}
  validates :stage_type, presence: {message: "阶段类型不能为空"}
  validates :category, presence: {message: "模板类型不能为空"}
end
