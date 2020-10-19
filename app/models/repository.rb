class Repository < ApplicationRecord
  self.inheritance_column = nil # FIX  The single-table inheritance mechanism failed
  belongs_to :project, :touch => true
  belongs_to :user, optional: true
  has_one :mirror, foreign_key: :repo_id
  has_one :ci_cloud_account, class_name: 'Ci::CloudAccount', foreign_key: :repo_id
  has_many :version_releases, dependent: :destroy

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
end
