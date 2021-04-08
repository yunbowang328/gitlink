# Get languages and number of bytes of code written
class Gitea::Repository::Languages::ListService < Gitea::ClientService
  attr_reader :owner, :repo, :token

  # owner: owner of the repo
  # repo: the name of repository
  # token: token of gitea user
  # eq: Gitea::Repository::Languages::ListService.call(@owner.identifier,
  # @project.identifier, current_user&.gitea_token)
  def initialize(owner, repo, token)
    @owner = owner
    @repo  = repo
    @args  = token
  end

  def call
    response = get(url, params)

    status, message, body = render_response(response)
    json_format(status, message, body)
  end

  private
  def params
    {}.merge(token: token)
  end

  def url
    "/repos/#{owner}/#{repo}/languages".freeze
  end

  def json_format(status, message, body)
    case status
    when 200 then success(body)
    else
      error(message, status)
    end
  end
end
