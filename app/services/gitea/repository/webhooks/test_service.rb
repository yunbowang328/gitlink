class Gitea::Repository::Webhooks::TestService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :webhook_id

  def initialize(token, owner, repo, webhook_id)
    @token = token 
    @owner = owner 
    @repo = repo 
    @webhook_id = webhook_id
  end

  def call 
    response = post(url, request_params)
    render_response(response)
  end

  private
  def request_params 
    Hash.new.merge({token: token})
  end

  def url
    "/repos/#{owner}/#{repo}/hooks/#{webhook_id}/tests".freeze
  end
end