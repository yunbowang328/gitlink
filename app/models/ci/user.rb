class Ci::User < Ci::RemoteBase
  self.primary_key = 'user_id'

  has_many :repos, foreign_key: "repo_user_id", dependent: :destroy

end
