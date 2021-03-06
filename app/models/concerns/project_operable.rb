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
    has_many :teams, through: :team_projects, source: :team
  end

  def set_owner_permission(creator)
    return unless owner.is_a?(Organization)
    owner.build_permit_team_projects!(id)
    # 避免自己创建的项目，却无法拥有访问权，因为该用户所在团队暂未获得项目访问权
    return if creator.nil? || owner.is_owner?(creator.id)
    add_member!(creator.id, "Manager")
  end

  def add_member!(user_id, role_name='Developer')
    member = members.create!(user_id: user_id)
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
      managers.exists?(user_id: user.id) || owner.is_owner?(user.id) || owner.is_only_admin?(user.id)
    else
      false
    end
  end

  # 项目开发者，可读可写权限
  def develper?(user)
    if owner.is_a?(User)
      developers.exists?(user_id: user.id)
    elsif owner.is_a?(Organization)
      developers.exists?(user_id: user.id) || owner.is_only_write?(user.id)
    else
      false
    end
  end

  # 报告者，只有可读权限
  def reporter?(user)
    if owner.is_a?(User)
      reporters.exists?(user_id: user.id)
    elsif owner.is_a?(Organization)
      reporters.exists?(user_id: user.id) || owner.is_only_read?(user.id)
    else
      false
    end
  end

  def operator?(user)
    user.admin? || (member?(user.id) && !reporter?(user))
  end

  def set_developer_role(member, role_name)
    role = Role.find_by(name: role_name)
    member.member_roles.create!(role: role)
  end

  def has_menu_permission(unit_type)
    self.project_units.where(unit_type: unit_type).exists?
  end

  def all_collaborators 
    member_sql = User.joins(members: :roles).where(members: {project_id: self.id}, roles: {name: %w(Manager Developer Reporter)}).to_sql 
    team_user_sql = User.joins(teams: :team_projects).where(team_projects: {project_id: self.id}).to_sql
    return User.from("( #{ member_sql } UNION #{ team_user_sql } ) AS users").distinct
  end

  def all_developers
    member_sql = User.joins(members: :roles).where(members: {project_id: self.id}, roles: {name: %w(Manager Developer)}).to_sql 
    team_user_sql = User.joins(teams: :team_projects).where(teams: {authorize: %w(owner admin write)}, team_projects: {project_id: self.id}).to_sql
    return User.from("( #{ member_sql } UNION #{ team_user_sql } ) AS users").distinct
  end

  def all_managers 
    member_sql = User.joins(members: :roles).where(members: {project_id: self.id}, roles: {name: %w(Manager)}).to_sql 
    team_user_sql = User.joins(teams: :team_projects).where(teams: {authorize: %w(owner admin)},team_projects: {project_id: self.id}).to_sql 
    return User.from("( #{ member_sql} UNION #{ team_user_sql } ) AS users").distinct
  end
end
