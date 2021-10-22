class Gitea::Repository::Webhooks::CreateService < Gitea::ClientService 
  attr_reader :token, :owner, :repo, :params 
  def initialize(token, owner, repo, params) 
    @token = token
    @owner = owner 
    @repo = repo
    @params = params
  end

  def call 
    response = post(url, request_params)
    render_response(response)
  end

  private
  def request_params 
    Hash.new.merge({token: token, data: params})
  end

  def url
    "/repos/#{owner}/#{repo}/hooks".freeze
  end
end