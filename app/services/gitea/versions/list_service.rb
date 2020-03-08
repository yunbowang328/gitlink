# Get a list of all commits from a repository
class Gitea::Versions::ListService < Gitea::ClientService
  attr_reader :token, :user_name, :repo

  # sha: SHA or branch to start listing commits from (usually 'master')
  def initialize(token, user_name, repo)
    @token = token
    @user_name = user_name
    @repo = repo
  end

  def call
    response = get(url, params)
    render_result(response)
  end

  private
  def params
    Hash.new.merge(token: token)
  end

  def url
    "/repos/#{@user_name}/#{@repo}/releases".freeze
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
