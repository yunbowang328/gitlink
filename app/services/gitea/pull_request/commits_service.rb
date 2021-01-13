# List commits on a pull request
class Gitea::PullRequest::CommitsService < Gitea::ClientService
  attr_reader :owner, :repo, :pull_number, :token

  # GET /repos/{owner}/{repo}/pulls/{pull_number}/commits
  # owner: 用户
  # repo: 仓库名称/标识
  # pull_number: pull request主键id
  # eg:
  # Gitea::PullRequest::FilesService.call('jasder', 'repo_identifier', 1)
  def initialize(owner, repo, pull_number, token=nil)
    @owner   = owner
    @repo   = repo
    @token  = token
    @pull_number = pull_number
  end

  def call
    response = get(url, params)
    render_result(response)
  end

  private
  def params
    Hash.new.merge(token: token)
  end

  def url
    "/repos/#{owner}/#{repo}/pulls/#{pull_number}/commits".freeze
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
