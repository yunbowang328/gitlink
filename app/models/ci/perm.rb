class Ci::Perm < Ci::RemoteBase
  belongs_to :user, foreign_key: :perm_user_id

end
