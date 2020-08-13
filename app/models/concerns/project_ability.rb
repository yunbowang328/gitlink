module ProjectAbility
  extend ActiveSupport::Concern

  included do

  end

  def can_read_project?(project)
    return true if self.admin?
    return false if !project.is_public? && !project.member?(self.id)
    true
  end

end
