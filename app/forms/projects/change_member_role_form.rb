class Projects::ChangeMemberRoleForm < BaseForm
  attr_accessor :user_id, :role

  validates :user_id, :role, presence: true
  validate :check_roles

  def check_roles
    raise '无效的role值.' unless ["Manager","Developer", "Reporter"].include? role
  end
end
