class Repository < ApplicationRecord
  self.inheritance_column = nil # FIX  The single-table inheritance mechanism failed
  belongs_to :project, :touch => true
  belongs_to :user
  has_many :version_releases, dependent: :destroy

  validates :identifier, presence: true

  def to_param
    self.identifier.parameterize
  end
end
