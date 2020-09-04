class Gitea::Hooks::ListService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :params

  def initialize(token, owner, repo_name, params={})
    @token   = token
    @owner   = owner
    @repo    = repo
    @params  = params
  end

  def call
    get(url, params)
  end

  private
  def params
    Hash.new.merge(token: token,
      page: params[:page],
      limit: params[:limit]
    ).compact!
  end

  def url
    "/repos/#{owner}/#{repo}/hooks".freeze
  end

end
