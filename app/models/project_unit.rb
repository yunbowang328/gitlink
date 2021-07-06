# == Schema Information
#
# Table name: project_units
#
#  id         :integer          not null, primary key
#  project_id :integer
#  unit_type  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_project_units_on_project_id  (project_id)
#

class ProjectUnit < ApplicationRecord
  belongs_to :project

  enum unit_type: {code: 1, issues: 2, pulls: 3, devops: 4, versions: 5, resources: 6, gantt: 7, sonar: 8}

  validates :unit_type, uniqueness: { scope: :project_id}

  def self.init_types(project_id, project_type='common')
    unit_types = project_type == 'sync_mirror' ? ProjectUnit::unit_types.except("pulls") : ProjectUnit::unit_types
    unit_types.each do |_, v|
      self.create!(project_id: project_id, unit_type: v)
    end
  end

  def self.update_by_unit_types!(project, types) 
    # 同步镜像项目不能有合并请求模块
    types.delete("pulls") if project.sync_mirror?
    # 默认code类型自动创建
    types << "code"
    project.project_units.where.not(unit_type: types).each(&:destroy!)
    types.each do |type|
      project.project_units.find_or_create_by!(unit_type: type)
    end
  end
end
