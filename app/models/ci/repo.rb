class Ci::Repo < Ci::RemoteBase
  self.primary_key = 'repo_id'

  belongs_to :user, foreign_key: :repo_user_id
  has_one :perm, foreign_key: :perm_repo_uid, dependent: :destroy
  has_many :builds, foreign_key: "build_repo_id", dependent: :destroy

  def self.find_with_namespace(namespace_path, identifier)
    logger.info "########namespace_path: #{namespace_path} ########identifier: #{identifier} "

    user = Ci::User.find_by_user_login namespace_path
    repo = Ci::Repo.where(repo_namespace: namespace_path, repo_name: identifier).first

    [user, repo]
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

  def self.auto_create!(user, project)
    repo = new(
      repo_user_id: user.user_id,
      repo_namespace: project.owner.login,
      repo_name: project.identifier,
      repo_slug: "#{project.owner.login}/#{project.identifier}",
      repo_clone_url: project.repository.url,
      repo_active: 1,
      repo_private: true,
      repo_visibility: 'private',
      repo_branch: 'master',
      repo_counter: 0,
      repo_trusted: false,
      repo_protected: false,
      repo_synced: 0,
      repo_version: 1,
      repo_signer: generate_code,
      repo_secret: generate_code,
      repo_timeout: 60,
      repo_config: '.trustie-pipeline.yml',
      repo_created: Time.now.to_i,
      repo_updated: Time.now.to_i
    )
    if repo.save!
      Ci::Perm.auto_create!(user, repo)
      repo
    end
  end
end
