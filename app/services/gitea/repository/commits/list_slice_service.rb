# Get a list of all commits from a repository
class Gitea::Repository::Commits::ListSliceService < Gitea::ClientService
  attr_reader :owner, :repo_name, :args

  # sha: SHA or branch to start listing commits from (usually 'master')
  # ex:
  #   Gitea::Repository::Commits::ListService.new(@project.owner.login, @project.identifier,
  #          sha: params[:sha], page: params[:page], limit: params[:limit], token: current_user&.gitea_token).call
  def initialize(owner, repo_name, **args)
    @owner     = owner
    @repo_name = repo_name
    @args      = args
  end

  def call
    response = get(url, params)
    render_result(response)
  end

  private
  def params
    { sha: args[:sha] || 'master', page: args[:page] || PAGINATE_DEFAULT_PAGE, limit: args[:limit] || PAGINATE_DEFAULT_LIMIT, token: args[:token] || "" }
  end

  def url
    "/repos/#{owner}/#{repo_name}/commits_slice".freeze
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
