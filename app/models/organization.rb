# == Schema Information
#
# Table name: users
#
#  id                         :integer          not null, primary key
#  login                      :string(255)      default(""), not null
#  hashed_password            :string(40)       default(""), not null
#  firstname                  :string(30)       default(""), not null
#  lastname                   :string(255)      default(""), not null
#  mail                       :string(60)
#  admin                      :boolean          default("0"), not null
#  status                     :integer          default("1"), not null
#  last_login_on              :datetime
#  language                   :string(5)        default("")
#  auth_source_id             :integer
#  created_on                 :datetime
#  updated_on                 :datetime
#  type                       :string(255)
#  identity_url               :string(255)
#  mail_notification          :string(255)      default(""), not null
#  salt                       :string(64)
#  gid                        :integer
#  visits                     :integer          default("0")
#  excellent_teacher          :integer          default("0")
#  excellent_student          :integer          default("0")
#  phone                      :string(255)
#  authentication             :boolean          default("0")
#  grade                      :integer          default("0")
#  experience                 :integer          default("0")
#  nickname                   :string(255)
#  show_realname              :boolean          default("1")
#  professional_certification :boolean          default("0")
#  ID_number                  :string(255)
#  certification              :integer          default("0")
#  homepage_teacher           :boolean          default("0")
#  homepage_engineer          :boolean          default("0")
#  is_test                    :integer          default("0")
#  ecoder_user_id             :integer          default("0")
#  business                   :boolean          default("0")
#  profile_completed          :boolean          default("0")
#  laboratory_id              :integer
#  is_shixun_marker           :boolean          default("0")
#  admin_visitable            :boolean          default("0")
#  collaborator               :boolean          default("0")
#  gitea_uid                  :integer
#  is_sync_pwd                :boolean          default("1")
#  watchers_count             :integer          default("0")
#  devops_step                :integer          default("0")
#  gitea_token                :string(255)
#  platform                   :string(255)
#
# Indexes
#
#  index_users_on_ecoder_user_id     (ecoder_user_id)
#  index_users_on_homepage_engineer  (homepage_engineer)
#  index_users_on_homepage_teacher   (homepage_teacher)
#  index_users_on_laboratory_id      (laboratory_id)
#  index_users_on_login              (login) UNIQUE
#  index_users_on_mail               (mail) UNIQUE
#  index_users_on_phone              (phone) UNIQUE
#  index_users_on_type               (type)
#

class Organization < Owner
  alias_attribute :name, :login
  NAME_REGEX = /^(?!_)(?!.*?_$)[a-zA-Z0-9_-]+$/ #只含有数字、字母、下划线不能以下划线开头和结尾

  default_scope { where(type: "Organization") }

  has_one :organization_extension, dependent: :destroy
  has_many :teams, dependent: :destroy
  has_many :organization_users, dependent: :destroy
  has_many :team_users, dependent: :destroy

  validates :login, presence: true
  validates_uniqueness_of :login, :if => Proc.new { |user| user.login_changed? && user.login.present? }, case_sensitive: false
  validates :login, format: { with: NAME_REGEX, multiline: true, message: "只能含有数字、字母、下划线且不能以下划线开头和结尾" }

  delegate :description, :website, :location, :repo_admin_change_team_access, :recommend,
           :visibility, :max_repo_creation, :num_projects, :num_users, :num_teams, to: :organization_extension, allow_nil: true

  scope :with_visibility, ->(visibility) { joins(:organization_extension).where(organization_extensions: {visibility: visibility}) if visibility.present? }

  after_save :reset_cache_data

  def reset_cache_data
    Cache::V2::OwnerCommonService.new(self.id).reset
  end

  def self.build(name, nickname, gitea_token=nil)
    self.create!(login: name, nickname: nickname, gitea_token: gitea_token)
  end

  def can_create_project?(user_id)
    team_users.joins(:team).where(user_id: user_id, teams: {can_create_org_project: true}).present?
  end

  def is_member?(user_id)
    organization_users.where(user_id: user_id).present?
  end

  def is_owner?(user_id)
    team_users.joins(:team).where(user_id: user_id, teams: {authorize: %w(owner)}).present?
  end

  def is_admin?(user_id)
    team_users.joins(:team).where(user_id: user_id, teams: {authorize: %w(admin owner)}).present?
  end

  def is_write?(user_id)
    team_users.joins(:team).where(user_id: user_id, teams: {authorize: %w(write admin owner)}).present?
  end

  def is_read?(user_id)
    team_users.joins(:team).where(user_id: user_id, teams: {authorize: %w(read write admin owner)}).present?
  end

  def is_only_admin?(user_id)
    team_users.joins(:team).where(user_id: user_id, teams: {authorize: %w(admin)}).present?
  end

  def is_only_write?(user_id)
    team_users.joins(:team).where(user_id: user_id, teams: {authorize: %w(write)}).present?
  end

  def is_only_read?(user_id)
    team_users.joins(:team).where(user_id: user_id, teams: {authorize: %w(read)}).present?
  end

  # 是不是所有者团队的最后一个成员
  def is_owner_team_last_one?(user_id)
    owner_team_users = team_users.joins(:team).where(teams: {authorize: %w(owner)})
    owner_team_users.pluck(:user_id).include?(user_id) && owner_team_users.size == 1
  end

  # 为包含组织所有项目的团队创建项目访问权限
  def build_permit_team_projects!(project_id)
    teams.where(includes_all_project: true).each do |team|
      TeamProject.build(id, team.id, project_id)
    end
  end

  def real_name
    name = lastname + firstname
    name = name.blank? ? (nickname.blank? ? login : nickname) : name
    name.gsub(/\s+/, '').strip    #6.11 -hs
  end

  def show_real_name
    name = lastname + firstname
    if name.blank?
      nickname.blank? ? login : nickname
    else
      name
    end
  end
end
