module ProjectOperable
  extend ActiveSupport::Concern

  included do
    has_many :members, dependent: :destroy
    has_many :except_owner_members, -> { joins(:roles).where.not(roles: { name: 'Manager' }) }, class_name: 'Member'
    has_many :managers,             -> { joins(:roles).where(roles: { name: 'Manager' }) }, class_name: 'Member'
    has_many :developers,           -> { joins(:roles).where(roles: { name: 'Developer' }) }, class_name: 'Member'
    has_many :reporters,            -> { joins(:roles).where(roles: { name: 'Reporter' }) }, class_name: 'Member'
    has_many :writable_members,     -> { joins(:roles).where.not(roles: {name: 'Reporter'}) }, class_name: 'Member'
    has_many :team_projects, dependent: :destroy
  end

  def add_member!(user_id, role_name='Developer', is_apply_signature=false)
    member = members.create!(user_id: user_id, is_apply_signature: is_apply_signature)
    set_developer_role(member, role_name)
  end

  def remove_member!(user_id)
    member = members.find_by(user_id: user_id)
    member.destroy! if member && self.user_id != user_id
  end

  def member?(user_id)
    if owner.is_a?(User)
      members.exists?(user_id: user_id)
    elsif owner.is_a?(Organization)
      members.exists?(user_id: user_id) || team_projects.joins(team: :team_users).where(team_users: {user_id: user_id}).present?
    else
      false
    end
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
    if owner.is_a?(User)
      self.owner == user
    elsif owner.is_a?(Organization)
      owner.is_owner?(user.id)
    else
      false
    end
  end

  # 项目管理员(包含项目拥有者)，权限：仓库设置、仓库可读可写
  def manager?(user)
    if owner.is_a?(User)
      managers.exists?(user_id: user.id)
    elsif owner.is_a?(Organization)
      managers.exists?(user_id: user.id) || owner.is_admin?(user.id)
    else
      false
    end
  end

  # 项目开发者，可读可写权限
  def develper?(user)
    if owner.is_a?(User)
      developers.exists?(user_id: user.id)
    elsif owner.is_a?(Organization)
      developers.exists?(user_id: user.id) || owner.is_write?(user.id)
    else
      false
    end
  end

  # 报告者，只有可读权限
  def reporter?(user)
    if owner.is_a?(User)
      reporters.exists?(user_id: user.id)
    elsif owner.is_a?(Organization)
      reporters.exists?(user_id: user.id) || owner.is_read?(user.id)
    else
      false
    end
  end

  def set_developer_role(member, role_name)
    role = Role.find_by(name: role_name)
    member.member_roles.create!(role: role)
  end

end
