# Get a pull request
class Gitea::PullRequest::GetService < Gitea::ClientService
  attr_reader :owner, :repo, :number, :token

  #eq:
  # Gitea::PullRequest::GetService.call(user.login, repository.identifier, pull.gitea_number, user.gitea_token)
  def initialize(owner, repo, number, token=nil)
    @owner  = owner
    @repo   = repo
    @number = number
    @token  = token
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
    "/repos/#{owner}/#{repo}/pulls/#{number}".freeze
  end

  def render_result(response)
    case response.status
    when 200
      JSON.parse(response.body)
    else
      {}
    end
  end
end
