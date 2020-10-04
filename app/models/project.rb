class Project < ApplicationRecord
  include Matchable
  include Publicable
  include Watchable
  include ProjectOperable

  # common:开源托管项目
  # mirror:普通镜像项目，没有定时同步功能
  # sync_mirror:同步镜像项目，有系统定时同步功能，且用户可手动同步操作
  #
  enum project_type: { sync_mirror: 2, mirror: 1, common: 0 }

  belongs_to :ignore, optional: true
  belongs_to :license, optional: true
  belongs_to :owner, class_name: 'User', foreign_key: :user_id
  belongs_to :project_category, optional: true , :counter_cache => true
  belongs_to :project_language, optional: true , :counter_cache => true
  has_many :project_trends, dependent: :destroy
  has_many :watchers, as: :watchable, dependent: :destroy
  has_many :fork_users, dependent: :destroy
  has_many :forked_users, class_name: 'ForkUser', foreign_key: :fork_project_id, dependent: :destroy
  # has_many :commits, dependent: :destroy

  has_one :project_score, dependent: :destroy
  has_one :repository, dependent: :destroy
  has_many :pull_requests, dependent: :destroy
  has_many :issue_tags, -> { order("issue_tags.created_at DESC") }, dependent: :destroy
  has_many :issues, dependent: :destroy
  # has_many :user_grades, dependent: :destroy
  has_many :attachments, as: :container, dependent: :destroy
  has_one :project_score, dependent: :destroy
  has_many :versions, -> { order("versions.created_on DESC, versions.name DESC") }, dependent: :destroy
  has_many :praise_treads, as: :praise_tread_object, dependent: :destroy
  has_and_belongs_to_many :trackers, :order => "#{Tracker.table_name}.position"

  after_save :check_project_members
  scope :project_statics_select, -> {select(:id,:name, :is_public, :identifier, :status, :project_type, :user_id, :forked_count, :visits, :project_category_id, :project_language_id, :license_id, :ignore_id, :watchers_count, :created_on)}
  scope :no_anomory_projects, -> {where("projects.user_id is not null and projects.user_id != ?", 2)}
  scope :recommend,           -> { visible.project_statics_select.where(recommend: true) }



  def self.search_project(search)
    ransack(name_or_identifier_cont: search)
  end
  # 创建者
  def creator
    User.find(user_id).full_name
  end

  def members_user_infos
    members.joins(:roles).where("roles.name in ('Manager', 'Developer')").joins("left join users on members.user_id = users.id ").includes(:user).where("users.type = ?", "User")
    # members.joins("left join users on members.user_id = users.id").select("users.id", "users.login","users.firstname","users.lastname")
    #   .pluck("users.id", "users.login","users.lastname", "users.firstname")
  end

  def to_param
    self.identifier.parameterize
  end

  def get_issues_count(status_id)
    if status_id.present?
      self&.issues.issue_issue.select(:id, :status_id).where(status_id: status_id)&.pluck(:id).size
    else
      self&.issues.issue_issue.select(:id)&.pluck(:id).size
    end
  end

  def get_pull_requests_count(status_id)
    if status_id.present?
      self&.pull_requests.select(:id, :status).where(status: status_id)&.pluck(:id).size
    else
      self&.pull_requests.select(:id)&.pluck(:id).size
    end
  end

  #创建项目管理员
  def check_project_members
    unless members.present? && members.exists?(user_id: self.user_id)
      member_params = {
        user_id: self.user_id,
        project_id: self.id
      }
      user_member = Member.new(member_params)
      if user_member.save
        role_id = Role.select(:id,:position).where(position: 3)&.first&.id
        MemberRole.create!(member_id: user_member.id ,role_id: role_id)
      end
    end
  end


  def self.init_bluck_repository
    Project.includes(:repository).find_each do |project|
      puts project.id
      next if project.owner.blank?
      if project.repository.blank?
        puts  "########### start create repositoy #############"
        Repository.create!(project_id: project.id, identifier: Project.generate_identifier, user_id: project&.owner&.id)
      end
    end
  end

  def self.generate_identifier
    str_arr = (("a".."z").to_a + ("A".."Z").to_a)

    str = str_arr.shuffle[0..8].join
    while Repository.exists?(identifier: str)
      str = str_arr.shuffle[0..8].join
    end
    str
  end

  def self.list_user_projects(user_id)
    projects = Project.is_private.select(:id,:user_id)
    user_not_show_1 = projects.where("user_id != ?",user_id).pluck(:id).uniq

    user_show_2 = projects.joins(:members).where("members.user_id = ?", user_id).pluck(:id).uniq
    Project.where.not(id: (user_not_show_1 - user_show_2).uniq)
  end

  def members_count
    members.select(:id).size
  end


  def can_visited?
    is_public? || User.current.admin? || member?(User.current)
  end

  def releases_size(current_user_id, type)
    if current_user_id == self.user_id && type.to_s == "all"
      self.repository.version_releases_count
    else
      self.repository.version_releases.releases_size
    end
  end

  def contributor_users
    self.pull_requests.select(:user_id).pluck(:user_id).uniq.size
  end

  def open_issues_count
    issues_count - closed_issues_count
  end

  def numerical_for_project_type
    self.class.name.constantize.project_types["#{self.project_type}"]
  end

  def watched_by? user
    watchers.pluck(:user_id).include? user&.id
  end

  def praised_by? user
    praise_treads.pluck(:user_id).include? user&.id
  end

  def get_premission user
    permission = "Reporter"
    member = members.find_by(user: user)

    member&.roles&.last&.name || permission
  end

  def fork_project
    Project.find_by(id: self.forked_from_project_id)
  end

  def self.members_projects(member_user_id)
    joins(:members).where(members: { user_id: member_user_id})
  end

  def self.find_with_namespace(namespace_path, identifier)
    logger.info "########namespace_path: #{namespace_path} ########identifier: #{identifier} "

    user = User.find_by_login namespace_path
    return nil if user.blank?

    project = user.projects.find_by(identifier: identifier)

    return nil if project.blank?
    project
  end
end
