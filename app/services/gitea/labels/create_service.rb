class Gitea::Labels::CreateService < Gitea::ClientService
  attr_reader :user, :repo, :params

  # params ex:
  # {
  # 	name: 'pull request title',
  # 	description: 'pull request content',
  # 	color: '#ffff',
  # }
  # repo: 仓库名称
  def initialize(user, repo, params={})
    @user   = user
    @repo   = repo
    @params = params
  end

  def call
    post(url, request_params)
  end

  private
  def url
    "/repos/#{user.login}/#{repo}/labels".freeze
  end

  def request_params
    Hash.new.merge(token: user.gitea_token, data: params)
  end
end
