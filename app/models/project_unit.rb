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

  enum unit_type: {code: 1, issues: 2, pulls: 3, devops: 4, versions: 5, resources: 6}

  validates :unit_type, uniqueness: { scope: :project_id}

  def self.init_types(project_id)
    ProjectUnit::unit_types.each do |_, v|
      self.create!(project_id: project_id, unit_type: v)
    end
  end

  def self.update_by_unit_types!(project, types) 
    # 默认code类型自动创建
    types << "code"
    project.project_units.where.not(unit_type: types).each(&:destroy!)
    types.each do |type|
      project.project_units.find_or_create_by!(unit_type: type)
    end
  end
end
