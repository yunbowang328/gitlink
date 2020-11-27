# == Schema Information
#
# Table name: compose_projects
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  project_id :integer
#  compose_id :integer
#  position   :integer          default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_compose_projects_on_user_id_and_project_id_and_compose_id  (user_id,project_id,compose_id)
#

class ComposeProject < ApplicationRecord
  #组织的项目记录表
  belongs_to :compose
end
