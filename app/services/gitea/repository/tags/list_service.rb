class Gitea::Repository::Tags::ListService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :params

  # ref: The name of the commit/branch/tag. Default the repository’s default branch (usually master)
  # repo: the name of repository
  def initialize(token, owner, repo, params={})
    @token  = token
    @owner  = owner
    @repo   = repo
    @params = params
  end

  def call
    response = get(url, request_params)
    render_result(response)
  end

  private
  def request_params
    Hash.new.merge(token: token, page: set_page, limit: set_limit)
  end

  def set_page
    (params[:page] || PAGINATE_DEFAULT_PAGE).to_i
  end

  def set_limit
    (params[:limit] || PAGINATE_DEFAULT_LIMIT).to_i
  end

  def url
    "/repos/#{owner}/#{repo}/tags".freeze
  end

  def render_result(response)
    body = JSON.parse(response.body)
    case response.status
    when 200 then body
    else
      {status: -1, message: "#{body['message']}"}
    end
  end
end
