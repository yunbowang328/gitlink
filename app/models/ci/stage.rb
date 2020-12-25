class Ci::Stage < Ci::RemoteBase
  self.primary_key = 'stage_id'

  belongs_to :build, foreign_key: :stage_build_id
  has_many :steps, foreign_key: "step_stage_id", dependent: :destroy
end
