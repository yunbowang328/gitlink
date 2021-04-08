class Gitea::Organization::Team::CreateService < Gitea::ClientService
  attr_reader :token, :org, :team

  def initialize(token, org, team)
    @token = token
    @org = org
    @team = team
  end

  def call
    response = post(url, request_params)
    render_status(response)
  end

  private
  def request_params
    create_params = {
        name: team.name,
        description: team.description,
        permission: permission(team.authorize),
        includes_all_repositories: team.includes_all_project,
        can_create_org_repo: team.can_create_org_project,
        units: unit_arrays
    }
    Hash.new.merge(token: token, data: create_params)
  end

  def permission(authorize)
    case authorize
    when "read"
      "read"
    when "write"
      "write"
    when "admin"
      "admin"
    when "owner"
      "owner"
    else
      "none"
    end
  end

  def unit_arrays
    team.team_units.pluck(:unit_type).collect{|t|"repo.#{t}"}
  end

  def url
    "/orgs/#{org.login}/teams".freeze
  end
end