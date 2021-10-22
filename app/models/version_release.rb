# == Schema Information
#
# Table name: version_releases
#
#  id               :integer          not null, primary key
#  user_id          :integer
#  name             :string(255)
#  body             :text(65535)
#  tag_name         :string(255)
#  target_commitish :string(255)
#  draft            :boolean          default("0")
#  prerelease       :boolean          default("0")
#  tarball_url      :string(255)
#  zipball_url      :string(255)
#  url              :string(255)
#  version_gid      :string(255)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  repository_id    :integer
#  sha              :string(255)
#
# Indexes
#
#  index_version_releases_on_repository_id  (repository_id)
#

class VersionRelease < ApplicationRecord
  belongs_to :repository, counter_cache: true
  belongs_to :user
  has_many :project_trends, as: :trend, dependent: :destroy
  scope :releases_size, ->{where(draft: false, prerelease: false).size}
  has_many :attachments, as: :container, dependent: :destroy

  def update_sha
    git_release = Gitea::Versions::GetService.call(user.gitea_token, repository&.owner&.login, repository&.identifier, version_gid)
    self.update(sha: git_release["sha"])
  end
end
