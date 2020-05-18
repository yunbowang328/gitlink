# Sync a mirrored repository
class Gitea::Repository::SyncMirroredService < Gitea::ClientService
  attr_reader :token, :owner, :repo

  # owner *
  #   owner of the repo to sync
  # repo *
  #   name of the repo to sync
  # example:
  #   Gitea::Repository::SyncMirroredService.new(owner.login, repo.identifier, user.gitea_token).call
  def initialize(owner, repo, token=nil)
    @token = token
    @owner = owner
    @repo  = repo
  end

  def call
    post(url, request_params)
  end

  private

  def request_params
    Hash.new.merge(token: token)
  end

  def url
    "/repos/#{owner}/#{repo}/mirror-sync".freeze
  end
end
