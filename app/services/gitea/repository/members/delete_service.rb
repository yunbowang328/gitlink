class Gitea::Repository::Members::DeleteService < Gitea::ClientService
  attr_reader :owner, :repo_name, :collaborator

  # owner: owner of the repo
  # repo_name: name of the repo
  # collaborator: username of the collaborator
  def initialize(owner, repo_name, collaborator)
    @owner        = owner
    @repo_name    = repo_name
    @collaborator = collaborator
  end

  def call
    delete(url, params)
  end

  private
  def params
    Hash.new.merge(token: owner.gitea_token)
  end

  def url
    "/repos/#{owner.login}/#{repo_name}/collaborators/#{collaborator}".freeze
  end
end
