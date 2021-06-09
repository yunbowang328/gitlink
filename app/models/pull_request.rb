# == Schema Information
#
# Table name: pull_requests
#
#  id              :integer          not null, primary key
#  pull_request_id :integer
#  gpid            :integer
#  user_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  status          :integer          default("0")
#  project_id      :integer
#  title           :string(255)
#  milestone       :integer
#  body            :text(65535)
#  head            :string(255)
#  base            :string(255)
#  issue_id        :integer
#  fork_project_id :integer
#  is_original     :boolean          default("0")
#  comments_count  :integer          default("0")
#  commits_count   :integer          default("0")
#  files_count     :integer          default("0")
#

class PullRequest < ApplicationRecord
  #status 0 默认未合并， 1表示合并, 2表示请求拒绝(或已关闭)
  OPEN   = 0
  MERGED  = 1
  CLOSED = 2

  belongs_to :issue
  belongs_to :user
  belongs_to :project, counter_cache: true, touch: true
  # belongs_to :fork_project, foreign_key: :fork_project_id
  has_many :pull_request_assigns, foreign_key: :pull_request_id
  has_many :pull_request_tags, foreign_key: :pull_request_id
  has_many :project_trends, as: :trend, dependent: :destroy
  has_many :attachments, as: :container, dependent: :destroy

  after_save :reset_cache_data
  after_destroy :reset_cache_data

  def reset_cache_data 
    self.reset_platform_cache_async_job
    self.reset_user_cache_async_job(self.user)
  end

  def fork_project
    Project.find_by(id: self.fork_project_id)
  end

  def bind_gitea_pull_request!(gitea_pull_number)
    update_column(:gpid, gitea_pull_number)
  end

  def merge!
    update_column(:status, PullRequest::MERGED)
  end

  def project_trend_status!
    self&.project_trends&.update_all(action_type: ProjectTrend::CLOSE)
  end

  # TODO: sync educoder platform repo's for update some statistics count
  def self.update_some_count
    PullRequest.includes(:user, :project).select(:id, :user_id, :gpid, :project_id, :fork_project_id).each do |pr|
      puts pr.id
      next if pr.gpid.blank?
      project = pr.project

      next if project.blank?
      user = project.owner
      next  if pr.gpid === 6 || pr.gpid === 7
      files_result = Gitea::PullRequest::FilesService.call(user.login, project.identifier, pr.gpid)
      pr.update_column(:files_count, files_result['NumFiles']) unless files_result.blank?

      commits_result = Gitea::PullRequest::CommitsService.call(user.login, project.identifier, pr.gpid)
      pr.update_column(:commits_count, commits_result.size) unless commits_result.blank?
    end
  end
end
