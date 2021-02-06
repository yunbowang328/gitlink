class Gitea::Organization::TeamUser::DeleteService < Gitea::ClientService
  attr_reader :token, :gtid, :username

  def initialize(token, gtid, username)
    @token = token
    @gtid = gtid
    @username = username
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
    "/teams/#{gtid}/members/#{username}"
  end
end