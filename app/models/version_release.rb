class VersionRelease < ApplicationRecord
  belongs_to :repository, counter_cache: true
  belongs_to :user
  has_many :project_trends, as: :trend, dependent: :destroy
  scope :releases_size, ->{where(draft: false, prerelease: false).size}
  # has_many :attachments, as: :container, dependent: :destroy
end
