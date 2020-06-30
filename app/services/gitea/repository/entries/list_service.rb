class Gitea::Repository::Entries::ListService < Gitea::ClientService
  attr_reader :user, :repo_name, :args

  # ref: The name of the commit/branch/tag. Default the repository’s default branch (usually master)
  # repo_name: the name of repository
  def initialize(user, repo_name, **args)
    @user      = user
    @repo_name = repo_name
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
    "/repos/#{user.login}/#{repo_name}/contents".freeze
  end

  def render_result(response)
    body = JSON.parse(response.body)
    case response.status
    when 200
      body
    else
      Rails.logger.info("########__________has_error_______##########{body['message']}")
     []
    end
  end
end
