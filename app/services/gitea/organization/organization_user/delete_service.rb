class Gitea::Organization::OrganizationUser::DeleteService < Gitea::ClientService
  attr_reader :token, :org_name, :username

  def initialize(token, org_name, username)
    @token = token
    @org_name = org_name
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
    "/orgs/#{org_name}/members/#{username}"
  end
end