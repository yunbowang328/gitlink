# Delete a specific branch protection for the repository

class Gitea::Repository::ProtectedBranches::DestroyService < Gitea::ClientService
  attr_reader :owner, :repo, :name, :token

  # owner: owner of the repo
  # repo: name of the repo
  # name: name of protected branch
  # eg:
  # Gitea::Repository::ProtectedBranches::DestroyService.call(user.login, repo.identifier, branch_name, user.gitea_token)
  def initialize(owner, repo, name, token=nil)
    @owner = owner
    @repo  = repo
    @name  = name
    @token = token
  end

  def call
    response = delete(url, params)
    status, message = render_response(response)
    json_format(status, message)
  end

  private
  def params
    Hash.new.merge(token: token, data: name)
  end

  def url
    "/repos/#{owner}/#{repo}/branch_protections/#{name}".freeze
  end

  def json_format(status, message)
    case status
    when 204 then success
    when 404 then error(message, 404)
    end
  end
end
