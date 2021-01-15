# Gets the preferred README for a repository.
class Gitea::Repository::Readme::GetService < Gitea::ClientService
  attr_reader :owner, :repo, :ref, :token

  # owner: owner of the repo
  # repo: name of the repo
  # name: The name of the commit/branch/tag. Default: the repository’s default branch (usually master)
  # eg:
  # Gitea::Repository::Readme::GetService.call(user.login, repo.identifier, ref, user.gitea_token)
  def initialize(owner, repo, ref, token=nil)
    @owner = owner
    @repo  = repo
    @ref   = ref || 'master'
    @token = token
  end

  def call
    response = get(url, params)
    status, message, body = render_response(response)
    json_format(status, message, body)
  end

  private
  def params
    Hash.new.merge(token: token, ref: ref)
  end

  def url
    "/repos/#{owner}/#{repo}/readme".freeze
  end

  def json_format(status, message, body)
    case status
    when 200 then success(body)
    when 404 then error(message, 404)
    else error(message, status)
    end
  end
end
