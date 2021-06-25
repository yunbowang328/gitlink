# == Schema Information
#
# Table name: projects
#
#  id                     :integer          not null, primary key
#  name                   :string(255)      default(""), not null
#  description            :text(4294967295)
#  homepage               :string(255)      default("")
#  is_public              :boolean          default("1"), not null
#  parent_id              :integer
#  created_on             :datetime
#  updated_on             :datetime
#  identifier             :string(255)
#  status                 :integer          default("1"), not null
#  lft                    :integer
#  rgt                    :integer
#  inherit_members        :boolean          default("0"), not null
#  project_type           :integer          default("0")
#  hidden_repo            :boolean          default("0"), not null
#  attachmenttype         :integer          default("1")
#  user_id                :integer
#  dts_test               :integer          default("0")
#  enterprise_name        :string(255)
#  organization_id        :integer
#  project_new_type       :integer
#  gpid                   :integer
#  forked_from_project_id :integer
#  forked_count           :integer          default("0")
#  publish_resource       :integer          default("0")
#  visits                 :integer          default("0")
#  hot                    :integer          default("0")
#  invite_code            :string(255)
#  qrcode                 :string(255)
#  qrcode_expiretime      :integer          default("0")
#  script                 :text(65535)
#  training_status        :integer          default("0")
#  rep_identifier         :string(255)
#  project_category_id    :integer
#  project_language_id    :integer
#  praises_count          :integer          default("0")
#  watchers_count         :integer          default("0")
#  issues_count           :integer          default("0")
#  pull_requests_count    :integer          default("0")
#  language               :string(255)
#  versions_count         :integer          default("0")
#  issue_tags_count       :integer          default("0")
#  closed_issues_count    :integer          default("0")
#  open_devops            :boolean          default("0")
#  gitea_webhook_id       :integer
#  open_devops_count      :integer          default("0")
#  recommend              :boolean          default("0")
#  platform               :integer          default("0")
#  license_id             :integer
#  ignore_id              :integer
#  default_branch         :string(255)      default("master")
#  website                :string(255)
#  lesson_url             :string(255)
#
# Indexes
#
#  index_projects_on_forked_from_project_id  (forked_from_project_id)
#  index_projects_on_identifier              (identifier)
#  index_projects_on_invite_code             (invite_code)
#  index_projects_on_is_public               (is_public)
#  index_projects_on_lft                     (lft)
#  index_projects_on_name                    (name)
#  index_projects_on_platform                (platform)
#  index_projects_on_project_type            (project_type)
#  index_projects_on_recommend               (recommend)
#  index_projects_on_rgt                     (rgt)
#  index_projects_on_status                  (status)
#  index_projects_on_updated_on              (updated_on)
#




class Project < ApplicationRecord
  include Matchable
  include Publicable
  include Watchable
  include ProjectOperable
  include Dcodes

  # common:开源托管项目
  # mirror:普通镜像项目，没有定时同步功能
  # sync_mirror:同步镜像项目，有系统定时同步功能，且用户可手动同步操作
  #
  enum project_type: { sync_mirror: 2, mirror: 1, common: 0 }

  # forge: trustie平台项目， educoder: educoder平台项目， 默认为forge平台
  enum platform: { forge: 0, educoder: 1 }

  belongs_to :ignore, optional: true
  belongs_to :license, optional: true
  belongs_to :owner, class_name: 'Owner', foreign_key: :user_id, optional: true
  belongs_to :organization_extension, foreign_key: :user_id, primary_key: :organization_id, optional: true, counter_cache: :num_projects
  belongs_to :project_category, optional: true , :counter_cache => true
  belongs_to :project_language, optional: true , :counter_cache => true
  has_many :project_trends, dependent: :destroy
  has_many :watchers, as: :watchable, dependent: :destroy
  has_many :fork_users, dependent: :destroy
  has_many :forked_users, class_name: 'ForkUser', foreign_key: :fork_project_id, dependent: :destroy
  has_one :project_educoder, dependent: :destroy

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
  has_one :project_detail, dependent: :destroy
  has_many :project_units, dependent: :destroy
  has_one :applied_transfer_project,-> { order created_at: :desc }, dependent: :destroy
  has_many :pinned_projects, dependent: :destroy 
  has_many :has_pinned_users, through: :pinned_projects, source: :user

  after_save :check_project_members, :reset_cache_data
  before_save :set_invite_code
  after_destroy :reset_cache_data
  scope :project_statics_select, -> {select(:id,:name, :is_public, :identifier, :status, :project_type, :user_id, :forked_count, :visits, :project_category_id, :project_language_id, :license_id, :ignore_id, :watchers_count, :created_on)}
  scope :no_anomory_projects, -> {where("projects.user_id is not null and projects.user_id != ?", 2)}
  scope :recommend,           -> { visible.project_statics_select.where(recommend: true) }

  delegate :content, to: :project_detail, allow_nil: true
  delegate :name, to: :license, prefix: true, allow_nil: true

  def reset_cache_data 
    if changes[:user_id].present?
      first_owner = Owner.find_by_id(changes[:user_id].first) 
      self.reset_user_cache_async_job(first_owner)
    end
    self.reset_platform_cache_async_job
    self.reset_user_cache_async_job(self.owner)
  end

  def set_invite_code
    if self.invite_code.nil?
      self.invite_code= self.generate_dcode('invite_code', 6)
    end
  end

  def self.search_project(search)
    ransack(name_or_identifier_cont: search)
  end
  # 创建者
  def creator
    User.find(user_id).full_name
  end

  def members_user_infos
    members.joins(:roles).where("roles.name in ('Manager', 'Developer', 'Reporter')").joins("left join users on members.user_id = users.id ").includes(:user).where("users.type = ?", "User")
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
    return if owner.is_a?(Organization)
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
    return "Owner" if owner?(user)
    return "Manager" if manager?(user)
    return "Developer" if develper?(user)
    return "Reporter" if reporter?(user)

    return ""
  end

  def fork_project
    Project.find_by(id: self.forked_from_project_id)
  end

  def self.members_projects(member_user_id)
    joins(:members).where(members: { user_id: member_user_id})
  end

  def self.find_with_namespace(namespace_path, identifier)
    logger.info "########namespace_path: #{namespace_path} ########identifier: #{identifier} "

    user = Owner.find_by_login namespace_path
    project = user&.projects&.find_by(identifier: identifier) || Project.find_by(identifier: "#{namespace_path}/#{identifier}")
    return nil if project.blank?

    [project, user]
  end

  def ci_reactivate?
    open_devops_count > 0
  end

  def ci_reactivate!(ci_repo)
    ci_repo.update_column(:repo_active, 1)
    update_column(:open_devops, true)
    increment!(:open_devops_count)
  end

  def self.sync_educoder_shixun(url, private_token, page, per_page)
    SyncEducoderShixunJob.perform_later(url, private_token, page, per_page)
  end

  def self.update_common_projects_count!
    ps = ProjectStatistic.first
    ps.increment!(:common_projects_count) unless ps.blank?
  end

  def self.update_mirror_projects_count!
    ps = ProjectStatistic.first
    ps.increment!(:mirror_projects_count) unless ps.blank?
  end

  def set_updated_on(time)
    return if time.blank?
    update_column(:updated_on, time)
  end

  def is_transfering
    applied_transfer_project&.common? ? true : false
  end
end
