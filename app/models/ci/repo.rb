class Ci::Repo < Ci::RemoteBase
  self.primary_key = 'repo_id'

  belongs_to :user, foreign_key: :repo_user_id
  has_one :perm, foreign_key: :perm_repo_uid, dependent: :destroy
  has_many :builds, foreign_key: "build_repo_id", dependent: :destroy

  def self.find_with_namespace(namespace_path, identifier)
    logger.info "########namespace_path: #{namespace_path} ########identifier: #{identifier} "

    user = Ci::User.find_by_user_login namespace_path
    repo = Ci::Repo.where(repo_namespace: namespace_path, repo_name: identifier).first

    (user.blank? || repo.blank?) ? nil : [user, repo]
  end

  def activate!(ci_user_id)
    update(repo_active: 1,
      repo_signer: generate_code,
      repo_secret: generate_code,
      repo_user_id: ci_user_id,
      repo_timeout: 60,
      repo_config: '.trustie-pipeline.yml',
      repo_updated: Time.now.to_i)
  end

end
