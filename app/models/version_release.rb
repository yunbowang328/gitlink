class VersionRelease < ApplicationRecord
  belongs_to :repository
  belongs_to :user
  has_many :project_trends, as: :trend, dependent: :destroy
  # has_many :attachments, as: :container, dependent: :destroy
end
