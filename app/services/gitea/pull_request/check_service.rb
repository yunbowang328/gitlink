# Check if a pull request has been merged
class Gitea::PullRequest::CheckService < Gitea::ClientService
  attr_reader :user, :repo, :pull_request_id

  # user: 用户
  # repo: 仓库名称/标识
  # pull_request_id: pull request主键id
  def initialize(user, repo, pull_request_id)
    super({token: user.gitea_token})
    @user   = user
    @repo   = repo
    @pull_request_id = pull_request_id
  end

  def call
    response = get(url, params)
    render_response(response)
  end

  private
  def params
    Hash.new.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo}/pulls/#{pull_request_id}/merge".freeze
  end

  def render_response(response)
    case response.status
    when 204 then true
    when 404 then false
    end
  end
end
