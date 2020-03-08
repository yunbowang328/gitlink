class PullRequest < ApplicationRecord
  #status 0 默认未合并， 1表示合并, 2表示请求拒绝
  belongs_to :issue
  belongs_to :user
  belongs_to :project, :counter_cache => true
  has_many :pull_request_assigns, foreign_key: :pull_request_id
  has_many :pull_request_tags, foreign_key: :pull_request_id
  has_many :project_trends, as: :trend, dependent: :destroy
  has_many :attachments, as: :container, dependent: :destroy
end
