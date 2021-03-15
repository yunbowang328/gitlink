# == Schema Information
#
# Table name: project_categories
#
#  id             :integer          not null, primary key
#  name           :string(255)
#  position       :integer
#  projects_count :integer          default("0")
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class ProjectCategory < ApplicationRecord
  include Projectable
  # has_ancestry

end
