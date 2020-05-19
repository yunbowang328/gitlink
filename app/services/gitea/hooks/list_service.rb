class Gitea::Hooks::ListService < Gitea::ClientService
  attr_reader :user, :repo_name

  def initialize(user, repo_name)
    @user = user 
    @repo_name = repo_name 
    @body = body 
  end

  def call 
    response = get(url, params)
  end

  private
  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}/hooks".freeze
  end

end