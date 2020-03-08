# 添加协作者/或者更改协作这的可读写权限
class Gitea::Repository::Members::AddService < Gitea::ClientService
  attr_reader :owner, :repo_name, :collaborator, :permission

  # owner: owner of the repo
  # repo_name: name of the repo
  # collaborator: username of the collaborator
  # permission: permission name, FIX: admin | read | write
  def initialize(owner, repo_name, collaborator, permission)
    @owner        = owner
    @repo_name    = repo_name
    @collaborator = collaborator
    @permission   = permission
  end

  def call
    put(url, params)
  end

  private
  def params
    Hash.new.merge(token: owner.gitea_token, data: {permission: permission})
  end

  def url
    "/repos/#{owner.login}/#{repo_name}/collaborators/#{collaborator}".freeze
  end
end
