class Gitea::Labels::UpdateService < Gitea::ClientService
  attr_reader :user, :repo,:label_id, :params

  # params ex:
  # {
  # 	name: 'pull request title',
  # 	description: 'pull request content',
  # 	color: '#ffff',
  # }
  # repo: 仓库名称
  def initialize(user, repo,label_id, params={})
    @user   = user
    @repo   = repo
    @params = params
    @label_id = label_id
  end

  def call
    put(url, request_params)
  end

  private
  def url
    "/repos/#{user.login}/#{repo}/labels/#{label_id}".freeze
  end

  def request_params
    Hash.new.merge(token: user.gitea_token, data: params)
  end
end
