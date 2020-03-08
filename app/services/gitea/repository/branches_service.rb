class Gitea::Repository::BranchesService < Gitea::ClientService
  attr_reader :user, :repo

  def initialize(user, repo)
    @user = user
    @repo = repo
  end

  def call
    response = get(url, params)
    render_data(response)
  end

  private
  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo}/branches".freeze
  end
end
