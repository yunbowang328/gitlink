class Gitea::Hooks::DestroyService < Gitea::ClientService
  attr_reader :user, :repo_name,:hook_id

  def initialize(user, repo_name, hook_id)
    @user = user 
    @repo_name = repo_name 
    @hook_id = hook_id
  end

  def call 
    response = delete(url, params)
  end

  private
  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}/hooks/#{hook_id}".freeze
  end

end