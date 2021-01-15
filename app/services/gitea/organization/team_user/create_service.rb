class Gitea::Organization::TeamUser::CreateService < Gitea::ClientService
  attr_reader :token, :gtid, :username

  def initialize(token, gtid, username)
    @token = token
    @gtid = gtid
    @username = username
  end

  def call
    response = put(url, request_params)
    render_status(response)
  end

  private
  def request_params
    Hash.new.merge(token: token)
  end

  def url
    "/teams/#{gtid}/members/#{username}".freeze
  end
end