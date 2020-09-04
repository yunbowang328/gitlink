class Ci::Perm < Ci::RemoteBase
  self.primary_key = nil

  belongs_to :ci_user, class_name: 'Ci::User', foreign_key: :perm_user_id

end
