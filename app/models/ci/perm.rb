class Ci::Perm < Ci::RemoteBase
  self.primary_key = nil

  belongs_to :user, class_name: 'Ci::User', foreign_key: :perm_user_id
  belongs_to :repo, class_name: 'Ci::Repo', foreign_key: :perm_repo_uid

  def self.auto_create!(user, repo)
    perm = new(
      perm_user_id: user.user_id,
      perm_repo_uid: repo.repo_id,
      perm_read: true,
      perm_write: true,
      perm_admin: true,
      perm_synced: 0,
      perm_created: Time.now.to_i,
      perm_updated: Time.now.to_i
    )
    perm.save!
  end
end
