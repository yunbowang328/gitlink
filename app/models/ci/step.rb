class Ci::Step < Ci::RemoteBase
  self.primary_key = 'step_id'

  belongs_to :stage, foreign_key: :step_stage_id
  has_one :log, class_name: 'Ci::Log', foreign_key: :log_id
end
