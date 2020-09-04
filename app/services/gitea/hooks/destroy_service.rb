class Gitea::Hooks::DestroyService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :hook_id

  def initialize(token, owner, repo, hook_id)
    @token   = token
    @owner   = owner
    @repo    = repo
    @hook_id = hook_id
  end

  def call
    delete(url, params)
  end

  private
  def params
    Hash.new.merge(token: token)
  end

  def url
    "/repos/#{owner}/#{repo}/hooks/#{hook_id}".freeze
  end
end
