class Gitea::Organization::Repository::CreateService < Gitea::ClientService
  attr_reader :token, :org_name, :params

  def initialize(token, org_name, params)
    @token = token
    @org_name = org_name
    @params = params
  end

  def call
    response = post(url, request_params)
    render_201_response(response)
  end

  private

  def request_params
    create_params = params.merge(readme: "readme")
    Hash.new.merge(token: token, data: create_params)
  end

  def url
    "/orgs/#{org_name}/repos".freeze
  end
end