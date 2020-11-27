class Gitea::Repository::GetByIdService < Gitea::ClientService
  attr_reader :owner, :repo_id

  def initialize(owner, repo_id)
    @owner   = owner
    @repo_id = repo_id
  end

  def call
    response = get(url, params)
    render_result(response)
  end

  private
  def params
    Hash.new.merge(token: owner.gitea_token)
  end

  def url
    "/repositories/#{repo_id}".freeze
  end

  def render_result(response)
    case response.status
    when 200
      JSON.parse(response.body)
    else
      nil
    end
  end
end
