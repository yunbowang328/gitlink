class Gitea::Labels::DeleteService < Gitea::ClientService
  attr_reader :user, :repo_name,:label_id

  def initialize(user, repo_name, label_id)
    @user = user
    @repo_name = repo_name
    @label_id = label_id
  end

  def call
    response = delete(url, params)
    render_result(response)
  end

  private

  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}/labels/#{label_id}".freeze
  end

  def render_result(response)
    return_body = response.body
    if return_body.present?
      body = JSON.parse(response.body)
    else
      body = []
    end
    case response.status
    when 204
      body
    else
      {status: -1, message: "#{body['message'] if body.present?}"}
    end
  end
end
