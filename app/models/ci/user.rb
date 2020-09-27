class Ci::User < Ci::RemoteBase
  self.primary_key = 'user_id'

  has_many :repos, foreign_key: :repo_user_id, dependent: :destroy
  has_many :perms, foreign_key: :perm_user_id, dependent: :delete_all
  has_one :ci_cloud_account, class_name: 'Ci::CloudAccount', foreign_key: :ci_user_id

end
