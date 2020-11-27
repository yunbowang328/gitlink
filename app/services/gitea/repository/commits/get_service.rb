# Get a single commit from a repository
class Gitea::Repository::Commits::GetService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :sha, :hash

  # sha: the commit hash
  # ex: Gitea::Repository::Commits::GetService.new(@repo.user.login, repo.identifier, params[:sha], current_user.gitea_token)
  # TODO custom参数用于判断调用哪个api
  def initialize(owner, repo, sha, token, hash={})
    @token = token
    @owner = owner
    @sha   = sha
    @repo  = repo
    @hash = hash
  end

  def call
    response = get(url, params)
    render_status(response)
  end

  private
  def params
    Hash.new.merge(token: token)
  end

  def url
    if hash[:diff]
      # TODO
      # 平台自己编写的gitea接口，后续可能会通过提交pr的形式合并到gitea原有的接口上
      "/repos/#{owner}/#{repo}/commits/#{sha}/diff".freeze
    else
      "/repos/#{owner}/#{repo}/git/commits/#{sha}".freeze
    end
  end
end
