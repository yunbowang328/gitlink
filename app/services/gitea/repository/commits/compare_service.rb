# Compare two commits
class Gitea::Repository::Commits::CompareService < Gitea::ClientService
  attr_reader :owner, :repo, :base, :head, :token

  # sha: the commit hash
  # ex:
  # Gitea::Repository::Commits::CompareService.call('owner', 'repo_identifier', 'master', 'jasder/repo_identifier:develop')
  def initialize(owner, repo, base, head, token=nil)
    @token = token
    @owner = owner
    @base  = base
    @repo  = repo
    @head  = head
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
    "/repos/#{owner}/#{repo}/compare/#{base}...#{head}".freeze
  end

  def render_result(response)
    case response.status
    when 200
      JSON.parse(response.body)
    else
      {status: -1, message: "#{body['message']}"}
    end
  end
end
