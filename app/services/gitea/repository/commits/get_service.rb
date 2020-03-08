# Get a single commit from a repository
class Gitea::Repository::Commits::GetService < Gitea::ClientService
  attr_reader :user, :repo_name, :sha

  # sha: the commit hash
  def initialize(user, repo_name, sha)
    @user      = user
    @sha       = sha
    @repo_name = repo_name
  end

  def call
    response = get(url, params)
    render_result(response)
  end

  private
  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}/git/commits/#{sha}".freeze
  end

  def render_result(response)
    body = JSON.parse(response.body)
    case response.status
    when 200
      JSON.parse(response.body)
    else
      {status: -1, message: "#{body['message']}"}
    end
  end
end
