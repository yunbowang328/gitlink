class Gitea::Repository::CheckPresentService < Gitea::ClientService
  attr_reader :user, :repo_name, :args

  def initialize(user, repo_name, **args)
    @user      = user
    @repo_name = repo_name
    @args      = {ref: 'master'}.merge(args.compact)
  end

  def call
    response = get(url, params)
    response.status
  end

  private
  def params
    @args.merge(token: user.gitea_token)
  end

  def url
    "/repos/#{user.login}/#{repo_name}/contents".freeze
  end

end
