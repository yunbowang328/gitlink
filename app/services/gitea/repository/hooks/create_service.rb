class Gitea::Repository::Hooks::CreateService < Gitea::ClientService
  attr_reader :user, :repo_name, :body

  def initialize(user, repo_name, body)
    @user = user 
    @repo_name = repo_name 
    @body = body 
  end

  def call 
    response = post(url, params)
  end

  private
  def params
    body.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}/hooks".freeze
  end

end