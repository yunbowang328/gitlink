class Ci::Build < Ci::RemoteBase
  self.primary_key = 'build_id'

  belongs_to :repo, foreign_key: :build_repo_id
  has_many :stages, foreign_key: "stage_build_id", dependent: :destroy
end
