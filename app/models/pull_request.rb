class PullRequest < ApplicationRecord
  #status 0 默认未合并， 1表示合并, 2表示请求拒绝
  include DunCheckAble
  belongs_to :issue
  belongs_to :user
  belongs_to :project, :counter_cache => true
  # belongs_to :fork_project, foreign_key: :fork_project_id
  has_many :pull_request_assigns, foreign_key: :pull_request_id
  has_many :pull_request_tags, foreign_key: :pull_request_id
  has_many :project_trends, as: :trend, dependent: :destroy
  has_many :attachments, as: :container, dependent: :destroy

  def fork_project
    Project.find_by(id: self.fork_project_id)
  end
end
