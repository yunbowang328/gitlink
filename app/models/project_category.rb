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
#  ancestry       :string(255)
#
# Indexes
#
#  index_project_categories_on_ancestry  (ancestry)
#

class ProjectCategory < ApplicationRecord
  include Projectable
  has_ancestry

  def self.descendants
    where.not(ancestry: [nil, ""])
  end

  def self.get_children(target_id)
    where(ancestry: target_id).pluck(:id,:name)
  end

end
