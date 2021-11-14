class Gitea::Repository::Webhooks::UpdateService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :id, :params
  def initialize(token, owner, repo, id, params)
    @token   = token
    @owner   = owner
    @repo = repo
    @id = id
    @params = params
  end

  def call
    response = patch(url, data_params)
    render_response(response)
  end

  private
  def url
    "/repos/#{owner}/#{repo}/hooks/#{id}"
  end

  def data_params
    Hash.new.merge(token: token, data: params).compact
  end
end