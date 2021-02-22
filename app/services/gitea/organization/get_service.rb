class Gitea::Organization::GetService < Gitea::ClientService
  attr_reader :user, :org_name

  def initialize(user, org_name)
    @user = user
    @org_name = org_name
  end

  def call
    response = get(url, params)
    render_status(response)
  end

  private
  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/orgs/#{org_name}".freeze
  end
end