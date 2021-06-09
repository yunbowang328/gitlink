# Sync a mirrored repository
class Gitea::Accelerator::SyncMirroredService < Gitea::Accelerator::BaseService
  attr_reader :repo, :token

  # repo *
  #   name of the repo to sync
  # example:
  #   Gitea::Accelerator::SyncMirroredService.call(repo.identifier)
  def initialize(repo, token=nil)
    @repo  = repo
    @token = token
  end

  def call
    return error('[gitea:] accelerator config missing') if check_accelerator!

    response = post(url, request_params)
  
    {status: response.status}
  end

  private

  def request_params
    Hash.new.merge(token: token).compact
  end

  def url
    "/repos/#{access_username}/#{repo}/mirror-sync".freeze
  end
end
