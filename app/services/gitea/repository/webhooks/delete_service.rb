class Gitea::Repository::Webhooks::DeleteService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :id 

  def initialize(token, owner, repo, id)
    @token = token 
    @owner = owner 
    @repo = repo 
    @id = id
  end

  def call 
    response = delete(url, params)
    render_response(response)
  end

  private
  def params
    Hash.new.merge(token: token)
  end

  def url
    "/repos/#{owner}/#{repo}/hooks/#{id}".freeze
  end
end