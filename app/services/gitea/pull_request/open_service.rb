class Gitea::PullRequest::OpenService < Gitea::PullRequest::UpdateService
  attr_reader :owner, :repo, :base, :number, :token

  # params:
  #   owner: owner of the repo
  #   repo: name of the repo
  #   base: branch name of base
  #   number: number of pull request
  #   token: token of gitea user
  # eq:
  # Gitea::PullRequest::OpenService.new(owner.login, repo.identifier, pr.gitea_number, pr.base, current_user.gitea_token)
  def initialize(owner, repo, number, base, token=nil)
    open_pull_params = Hash.new.merge(base: base, state: 'open').compact

    super(owner, repo, number, open_pull_params, token)
  end

  def call
    super
  end

end
