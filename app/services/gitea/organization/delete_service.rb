class Gitea::Organization::DeleteService < Gitea::ClientService
  attr_reader :token, :name

  def initialize(token, name)
    @token = token
    @name = name
  end

  def call
    response = delete(url, params)
    render_status(response)
  end

  private

  def params
    Hash.new.merge(token: token)
  end

  def url
    "/orgs/#{name}".freeze
  end
end
