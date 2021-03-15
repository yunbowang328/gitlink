class Gitea::Repository::Contributors::GetService < Gitea::ClientService
  attr_reader :owner, :repo_name

  def initialize(owner, repo_name)
    @owner = owner 
    @repo_name = repo_name
  end

  def call
    response = get(url, params)
    render_status(response)
  end

  private 
  def params
    Hash.new.merge(token: owner.gitea_token)
  end

  def url 
    "/repos/#{owner.login}/#{repo_name}/contributors"
  end
end