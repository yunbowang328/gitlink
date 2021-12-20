class Gitea::Organization::UpdateService < Gitea::ClientService
  attr_reader :token, :login, :org

  def initialize(token, login, org)
    @token = token
    @login = login
    @org = org
  end

  def call
    response = patch(url, request_params)
    render_status(response)
  end

  private
  def request_params
    update_params = {
        name: org.login,
        full_name: org.nickname,
        description: org.description,
        location: org.location,
        repo_admin_change_team_access: org.repo_admin_change_team_access,
        visibility: visibility(org.visibility),
        website: org.website,
        max_repo_creation: org.max_repo_creation
    }
    Hash.new.merge(token: token, data: update_params)
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
    "/orgs/#{login}".freeze
  end
end