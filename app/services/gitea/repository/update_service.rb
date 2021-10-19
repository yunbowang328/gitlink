class Gitea::Repository::UpdateService < Gitea::ClientService
  attr_reader :user, :repo, :params

  # params:
  # {
  #   name: 'name of the repository',
  #   default_branch: 'sets the default branch for this repository.',
  #   description: 'string a short description of the repository.',
  #   private: 'boolean either true to make the repository private or false to make it public.',
  #   has_issues: 'boolean either true to enable issues for this repository or false to disable them.',
  #   has_pull_requests: 'boolean either true to allow pull requests, or false to prevent pull request.',
  #   allow_merge_commits: 'boolean either true to allow merging pull requests with a merge commit, or false to prevent merging pull requests with merge commits. has_pull_requests must be true.'
  # }

  def initialize(user, repo, params={})
    @user   = user
    @repo   = repo
    @params = params
  end

  def call
    response = patch(url, data_params)
    render_200_response(response)
  end

  private
  def url
    "/repos/#{user.login}/#{repo}"
  end

  def data_params
    Hash.new.merge(token: user.gitea_token, data: params).compact
  end
end
