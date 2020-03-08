class Gitea::Repository::GetService < Gitea::ClientService
  attr_reader :user, :repo_name

  def initialize(user, repo_name)
    @user = user
    @repo_name = repo_name
  end

  def call
    response = get(url, params)
    render_result(response)
  end

  private
  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}".freeze
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
