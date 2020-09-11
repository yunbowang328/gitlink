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
