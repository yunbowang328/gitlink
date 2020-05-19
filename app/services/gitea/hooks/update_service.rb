class Gitea::Hooks::UpdateService < Gitea::ClientService
  attr_reader :user, :repo_name, :body,:hook_id

  def initialize(user, repo_name, body, hook_id)
    @user = user 
    @repo_name = repo_name 
    @body = body 
    @hook_id = hook_id
  end

  def call 
    response = patch(url, params)
  end

  private
  def params
    body.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}/hooks/#{hook_id}".freeze
  end

end