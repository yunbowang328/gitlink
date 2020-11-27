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
end
