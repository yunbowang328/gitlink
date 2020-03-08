class Gitea::Labels::ListService < Gitea::ClientService
  attr_reader :user, :repo_name


  def initialize(user, repo_name)
    @user      = user
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
    "/repos/#{user.login}/#{repo_name}/labels".freeze
  end

  def render_result(response)
    body = JSON.parse(response.body)
    case response.status
    when 200 then body
    else
      {status: -1, message: "#{body['message']}"}
    end
  end
end
