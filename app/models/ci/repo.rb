class Ci::Repo < Ci::RemoteBase
  self.primary_key = 'repo_id'

  belongs_to :user, foreign_key: :repo_user_id
  has_many :builds, foreign_key: "build_repo_id", dependent: :destroy

  def self.find_with_namespace(namespace_path, identifier)
    logger.info "########namespace_path: #{namespace_path} ########identifier: #{identifier} "

    user = Ci::User.find_by_user_login namespace_path
    return nil if user.blank?

    repo = user.repos.find_by(repo_name: identifier)

    return nil if repo.blank?
    [user, repo]
  end

  def enable
    update_column(:repo_config, '.trustie-pipeline.yml')
  end

  def activate
    
  end
end
