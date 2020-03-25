module ProjectOperable
  extend ActiveSupport::Concern

  included do
    has_many :members, dependent: :destroy
    has_many :except_owner_members, -> { joins(:roles).where.not(roles: { name: 'Manager' }) }, class_name: 'Member'
    has_many :manager_members,      -> { joins(:roles).where(roles: { name: 'Manager' }) }, class_name: 'Member'
  end

  def add_member!(user_id, role_name='Developer')
    member = members.create!(user_id: user_id)
    set_developer_role(member)
  end

  def remove_member!(user_id)
    member = members.find_by(user_id: user_id)
    member.destroy! if member && self.user_id != user_id
  end

  def member?(user_id)
    members.exists?(user_id: user_id)
  end

  # 除了项目创建者本身
  def member(user_id)
    members.where.not("members.user_id = ? ", owner.id).find_by(user_id: user_id)
  end

  def change_member_role!(user_id, role)
    member = self.member(user_id)
    member.member_roles.last.update_attributes!(role: role)
  end

  def owner?(user)
    self.owner == user
  end

  def set_developer_role(member)
    role = Role.find_by_name 'Developer'
    member.member_roles.create!(role: role)
  end

end
