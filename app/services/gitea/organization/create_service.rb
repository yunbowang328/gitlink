class Gitea::Organization::CreateService < Gitea::ClientService
  attr_reader :token, :org

  def initialize(token, org)
    @token = token
    @org = org
  end

  def call
    response = post(url, request_params)
    render_status(response)
  end

  private
  def request_params
    create_params = {
        username: org.login,
        description: org.description,
        location: org.location,
        repo_admin_change_team_access: org.repo_admin_change_team_access,
        visibility: visibility(org.visibility),
        website: org.website
    }
    Hash.new.merge(token: token, data: create_params)
  end

  def visibility(visibility)
    case visibility
    when "common"
      "public"
    when "limited"
      "limited"
    when "privacy"
      "private"
    else
      "public"
    end
  end

  def url
    "/orgs".freeze
  end
end