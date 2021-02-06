class Gitea::Organization::Team::DeleteService < Gitea::ClientService
  attr_reader :token, :gtid

  def initialize(token, gtid)
    @token = token
    @gtid = gtid
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
    "/teams/#{gtid}".freeze
  end
end