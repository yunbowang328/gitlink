class Gitea::Repository::Entries::GetService < Gitea::ClientService
  attr_reader :user, :repo_name, :filepath, :args

  # ref: The name of the commit/branch/tag. Default the repository’s default branch (usually master)
  # filepath: path of the dir, file, symlink or submodule in the repo
  # repo_name: the name of repository
  # ref: The name of the commit/branch/tag. Default the repository’s default branch (usually master)
  def initialize(user, repo_name, filepath, **args)
    @user      = user
    @repo_name = repo_name
    @filepath  = filepath
    @args      = {ref: 'master'}.merge(args.compact)
  end

  def call
    response = get(url, params)
    render_result(response)
  end

  private
  def params
    @args.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}/contents/#{filepath}".freeze
  end

  def render_result(response)
    body = JSON.parse(response.body)
    case response.status
    when 200
      body
    when 404
      raise '你访问的文件不存在'
    else
      raise body['message']
    end
  end
end
