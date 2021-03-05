class Gitea::Organization::GetService < Gitea::ClientService
  attr_reader :org

  def initialize(org)
    @org = org
  end

  def call
    response = get(url, params)
    render_status(response)
  end

  private
  def params
    Hash.new.merge(token: org.gitea_token)
  end

  def url
    "/orgs/#{org.login}".freeze
  end
end