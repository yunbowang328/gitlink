# == Schema Information
#
# Table name: project_educoders
#
#  id           :integer          not null, primary key
#  owner        :string(255)
#  repo_name    :string(255)
#  image_url    :string(255)
#  project_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  commit_count :integer          default("0")
#  forked_count :integer          default("0")
#
# Indexes
#
#  index_project_educoders_on_project_id  (project_id)
#  index_project_educoders_on_repo_name   (repo_name)
#

class ProjectEducoder < ApplicationRecord
  belongs_to :project, optional: true
end
