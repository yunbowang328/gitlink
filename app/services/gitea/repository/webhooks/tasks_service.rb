class Gitea::Repository::Webhooks::TasksService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :webhook_id

  # ref: The name of the commit/branch/tag. Default the repository’s default branch (usually master)
  # repo_name: the name of repository
  def initialize(token, owner, repo, webhook_id)
    @token = token 
    @owner = owner 
    @repo = repo 
    @webhook_id = webhook_id
  end

  def call
    response = get(url, params)
    render_response(response)
  end

  private
  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{owner}/#{repo}/hooks/#{webhook_id}/hook_tasks".freeze
  end

end
