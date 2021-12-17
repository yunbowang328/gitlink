# == Schema Information
#
# Table name: project_statistics
#
#  id                         :integer          not null, primary key
#  common_projects_count      :integer          default("0")
#  mirror_projects_count      :integer          default("0")
#  sync_mirror_projects_count :integer          default("0")
#  commits_total_count        :integer          default("0")
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#

class ProjectStatistic < ApplicationRecord

  def self.data
    data = self.last 
    if data.present?
      return data
    else 
      common_projects_count = Project.common.count
      mirror_projects_count = Project.mirror.count
      sync_mirror_projects_count = Project.sync_mirror.count
      return ProjectStatistic.create(common_projects_count: common_projects_count, mirror_projects_count: mirror_projects_count, sync_mirror_projects_count: sync_mirror_projects_count)
  
    end
  end
end
