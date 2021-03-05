class Ci::Repo < Ci::RemoteBase
  self.primary_key = 'repo_id'

  belongs_to :user, foreign_key: :repo_user_id
  has_one :perm, foreign_key: :perm_repo_uid
  has_many :builds, foreign_key: :build_repo_id, dependent: :destroy

  def self.find_with_namespace(namespace_path, identifier)
    logger.info "########namespace_path: #{namespace_path} ########identifier: #{identifier} "

    user = Ci::User.find_by_user_login namespace_path
    repo = Ci::Repo.where(repo_namespace: namespace_path, repo_name: identifier).first

    [user, repo]
  end

  def self.find_all_with_namespace(namespace_path)
    logger.info "########namespace_path: #{namespace_path}"
    repos = Ci::Repo.where(repo_namespace: namespace_path)
    return repos
  end

  def self.load_repo_by_repo_slug(repo_slug)
    logger.info "########repo_slug: #{repo_slug}"
    repo = Ci::Repo.where(repo_slug: repo_slug).first
    return repo
  end

  def find_by_repo_name(repo_name)
    logger.info "########repo_name: #{repo_name}"
    repos = Ci::Repo.where(repo_name: repo_name)
    return repos
  end

  def self.auto_create!(user, project)
    create_params = {
      repo_user_id: user.user_id,
      repo_namespace: project.owner.login,
      repo_name: project.identifier,
      repo_slug: "#{project.owner.login}/#{project.identifier}",
      repo_clone_url: project.repository.url,
      repo_branch: 'master',
      repo_config: '.trustie-pipeline.yml'
    }
    repo = create_repo(create_params)
    repo
  end

  def self.create_repo(create_params)
    repo = new(
      repo_user_id: create_params[:repo_user_id],
      repo_namespace: create_params[:repo_namespace],
      repo_name: create_params[:repo_name],
      repo_slug: create_params[:repo_slug],
      repo_scm: "git",
      repo_ssh_url: "",
      repo_html_url: "",
      repo_clone_url: create_params[:repo_clone_url],
      repo_active: 1,
      repo_private: true,
      repo_visibility: 'private',
      repo_branch: create_params[:repo_branch],
      repo_counter: 0,
      repo_trusted: false,
      repo_protected: false,
      repo_synced: 0,
      repo_version: 1,
      repo_timeout: 60,
      repo_config: create_params[:repo_config],
      repo_created: Time.now.to_i,
      repo_updated: Time.now.to_i
    )

    repo.repo_signer = repo.generate_code
    repo.repo_secret = repo.generate_code
    if repo.save!
      Ci::Perm.auto_create!(create_params[:repo_user_id], repo.id)
      repo.update_column(:repo_uid, repo.id)
      repo
    end
  end

  # 取消激活同一个项目（多个repo）
  def deactivate_repos!
    repos = find_by_repo_name(self.repo_name)
    repos.each do |repo|
      repo.update_column(:repo_active, 0)
    end
  end

  def activate!(project)
    repos = find_by_repo_name(self.repo_name)
    project.update_column(:open_devops, true)
    project.increment!(:open_devops_count)
    repos.each do |repo|
      repo.update_column(:repo_active, 1)
    end
  end

  def deactivate!
    update_column(:repo_active, 0)
  end

  def destroy!
    self.destroy
  end
end
