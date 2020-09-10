class Ci::Perm < Ci::RemoteBase
  self.primary_key = nil

  belongs_to :user, class_name: 'Ci::User', foreign_key: :perm_user_id
  belongs_to :repo, class_name: 'Ci::Repo', foreign_key: :perm_repo_uid
end
