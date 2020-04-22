# Get a list of all commits from a repository
class Gitea::Repository::Commits::ListService < Gitea::ClientService
  attr_reader :user, :repo_name, :args

  # sha: SHA or branch to start listing commits from (usually 'master')
  def initialize(user, repo_name, **args)
    @user      = user
    @repo_name = repo_name
    @args      = { sha: 'master', page: 1 }.merge(args.compact)
  end

  def call
    response = get(url, params)
    render_result(response)
  end

  private
  def params
    @args.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}/commits".freeze
  end

  def render_result(response)

    case response.status
    when 200
      result = {}
      headers = response.headers.to_hash
      body = JSON.parse(response.body)
      total_count = headers["x-total"]
      result.merge(total_count: total_count.to_i, body: body)
    else
      nil
      # {status: -1, message: "#{body['message']}"}
    end
  end
end
