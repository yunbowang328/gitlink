# Get a list of all commits from a repository
class Gitea::PullRequest::ListService < Gitea::ClientService
  attr_reader :user, :repo

  # sha: SHA or branch to start listing commits from (usually 'master')
  def initialize(user, repo)
    @user = user
    @repo = repo
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
    "/repos/#{@user.try(:login)}/#{@repo}/pulls".freeze
  end

  def render_result(response)
    body = JSON.parse(response.body)
    case response.status
    when 200
      body
    else
      {status: -1, message: "#{body['message']}"}
    end
  end
end
