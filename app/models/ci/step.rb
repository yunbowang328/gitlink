class Ci::Step < Ci::RemoteBase
  self.primary_key = 'step_id'

  belongs_to :stage, foreign_key: :step_stage_id
end
