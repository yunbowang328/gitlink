class Gitea::Repository::DeleteService < Gitea::ClientService
  attr_reader :user, :repo_name

  def initialize(user, repo_name)
    @user = user
    @repo_name = repo_name
  end

  def call
    delete(url, params)
  end

  private

  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}".freeze
  end
end
