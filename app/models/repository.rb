class Repository < ApplicationRecord
  self.inheritance_column = nil # FIX  The single-table inheritance mechanism failed
  belongs_to :project, :touch => true
  belongs_to :user
  has_one :mirror, foreign_key: :repo_id
  has_many :version_releases, dependent: :destroy

  validates :identifier, presence: true

  def to_param
    self.identifier.parameterize
  end

  # with repository is mirror
  def set_mirror!
    self.build_mirror(status: Mirror.statuses[:waiting]).save
  end
end
