module ProjectOperable
  extend ActiveSupport::Concern

  included do
    has_many :members, dependent: :destroy
    has_many :except_owner_members, -> { joins(:roles).where.not(roles: { name: 'Manager' }) }, class_name: 'Member'
    has_many :managers,             -> { joins(:roles).where(roles: { name: 'Manager' }) }, class_name: 'Member'
    has_many :developers,           -> { joins(:roles).where(roles: { name: 'Developer' }) }, class_name: 'Member'
    has_many :reporters,            -> { joins(:roles).where(roles: { name: 'Reporter' }) }, class_name: 'Member'
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

  # 项目管理员(包含项目拥有者)，权限：仓库设置、仓库可读可写
  def manager?(user)
    managers.exists?(user_id: user.id)
  end

  # 项目开发者，可读可写权限
  def develper?(user)
    developers.exists?(user_id: user.id)
  end

  # 报告者，只有可读权限
  def reporter?(user)
    reporters.exists?(user_id: user.id)
  end

  def set_developer_role(member)
    role = Role.find_by_name 'Developer'
    member.member_roles.create!(role: role)
  end

end
