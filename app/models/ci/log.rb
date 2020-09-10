class Ci::Log < Ci::RemoteBase
  self.primary_key = nil

  belongs_to :step, class_name: 'Ci::Step', foreign_key: :log_id
end
