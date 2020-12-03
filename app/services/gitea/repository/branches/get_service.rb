# Retrieve a specific branch from a repository, including its effective branch protection
class Gitea::Repository::Branches::GetService < Gitea::ClientService
  attr_reader :owner, :repo, :branch, :token

  #  ex:
  #   Gitea::Repository::Branches::GetService.new(@project.owner, @project.identifier, 'master', current_user.gitea_token).call
  def initialize(owner, repo, branch, token)
    @owner  = owner
    @repo   = repo
    @branch = branch
    @token  = token
  end

  def call
    response = get(url, params)
    render_200_response(response)
  end

  private
  def params
    Hash.new.merge(token: token)
  end

  def url
    "/repos/#{owner}/#{repo}/branches/#{branch}".freeze
  end
end
