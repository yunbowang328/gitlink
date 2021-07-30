class Gitea::PullRequest::CloseService < Gitea::PullRequest::UpdateService
  attr_reader :owner, :repo, :base, :number, :token

  # params:
  #   owner: owner of the repo
  #   repo: name of the repo
  #   base: branch name of base
  #   number: number of pull request
  #   token: token of gitea user
  # eq:
  # Gitea::PullRequest::CloseService.call(owner.login, repo.identifier, pull.gitea_number, pull.base, current_user.gitea_token)
  def initialize(owner, repo, number, base,token=nil)
    colse_pull_params = Hash.new.merge(base: base, state: 'closed').compact

    super(owner, repo, number, colse_pull_params, token)
  end

  def call
    super
  end

end
