# == Schema Information
#
# Table name: repositories
#
#  id                     :integer          not null, primary key
#  project_id             :integer          default("0"), not null
#  url                    :string(255)      default(""), not null
#  login                  :string(60)       default("")
#  password               :string(255)      default("")
#  root_url               :string(255)      default("")
#  type                   :string(255)
#  path_encoding          :string(64)
#  log_encoding           :string(64)
#  extra_info             :text(65535)
#  identifier             :string(255)
#  is_default             :boolean          default("0")
#  hidden                 :boolean          default("0")
#  shixun_id              :integer
#  myshixun_id            :integer
#  user_id                :integer
#  mirror_url             :string(255)
#  version_releases_count :integer          default("0")
#  fork_url               :string(255)
#  is_mirror              :boolean          default("0")
#
# Indexes
#
#  index_repositories_on_identifier  (identifier)
#  index_repositories_on_project_id  (project_id)
#  index_repositories_on_user_id     (user_id)
#

class Repository < ApplicationRecord
  self.inheritance_column = nil # FIX  The single-table inheritance mechanism failed
  belongs_to :project, :touch => true
  belongs_to :user, optional: true
  has_one :mirror, foreign_key: :repo_id
  has_one :ci_cloud_account, class_name: 'Ci::CloudAccount', foreign_key: :repo_id
  has_many :version_releases, dependent: :destroy
  has_many :protected_branches, class_name: 'ProtectedBranch', foreign_key: :repo_id, dependent: :destroy

  validates :identifier, presence: true

  def to_param
    self.identifier.parameterize
  end

  # with repository is mirror
  def set_mirror!
    self.build_mirror(status: Mirror.statuses[:waiting]).save
  end

  def mirror_status
    self&.mirror&.numerical_for_status
  end

  def mirror_num
    self&.mirror&.sync_num
  end

  def first_sync?
    self&.mirror&.sync_num === 1
  end

  def sync_mirror!
    repo_mirror = self.mirror
    repo_mirror.set_status!(Mirror.statuses[:waiting])
    repo_mirror.increment!(:sync_num)
  end

  def generate_hex(column)
    loop do
      hex = SecureRandom.hex
      break hex unless self.class.where(column => hex).any?
    end
  end

end
