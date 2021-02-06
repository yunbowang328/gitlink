class Gitea::Organization::TeamProject::DeleteService < Gitea::ClientService
  attr_reader :token, :gtid, :org_name, :repo_name

  def initialize(token, gtid, org_name, repo_name)
    @token = token
    @gtid = gtid
    @org_name = org_name
    @repo_name = repo_name
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
    "/teams/#{gtid}/repos/#{org_name}/#{repo_name}".freeze
  end
end