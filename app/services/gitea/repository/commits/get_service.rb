# Get a single commit from a repository
class Gitea::Repository::Commits::GetService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :sha, :custom

  # sha: the commit hash
  # ex: Gitea::Repository::Commits::GetService.new(@repo.user.login, repo.identifier, params[:sha], current_user.gitea_token)
  # TODO custom参数用于判断调用哪个api
  def initialize(owner, repo, sha, token, custom=false)
    @token = token
    @owner = owner
    @sha   = sha
    @repo  = repo
    @custom = custom
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
    if custom
      # TODO
      # 平台自己编写的gitea接口，后续可能会通过提交pr的形式合并到gitea原有的接口上
      "/repos/#{owner}/#{repo}/commits/diff/#{sha}".freeze
    else
      "/repos/#{owner}/#{repo}/git/commits/#{sha}".freeze
    end
  end

  def render_result(response)
    body = JSON.parse(response.body)
    case response.status
    when 200
      JSON.parse(response.body)
    else
      {status: -1, message: "#{body['message']}"}
    end
  end
end
