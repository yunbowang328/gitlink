class Ci::Build < Ci::RemoteBase
  self.primary_key = 'build_id'

  belongs_to :repo, foreign_key: :build_repo_id
  has_many :stages, foreign_key: "stage_build_id", dependent: :destroy

  scope :successed, ->{ by_status('success') }
  scope :failed,    -> { by_status('failure') }
  scope :running,   -> { by_status('running') }
  scope :errored,   -> { by_status('error') }
  scope :pending,   -> { by_status('pending') }
  scope :killed,   -> { by_status('killed') }
  scope :by_status, ->(status) { where(build_status: status) }

  scope :by_branch, ->(branch) { where(build_target: branch) }
end
