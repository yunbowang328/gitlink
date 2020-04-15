
class Gitea::PullRequest::CreateService < Gitea::ClientService
  attr_reader :user, :repo, :params

  # params ex:
  # {
  # 	title: 'pull request title',
  # 	body: 'pull request content',
  # 	head: 'develop', // from branch 源分支
  # 	base: 'master'   // to branch 目标分支
  # }
  # 以上列子说明从develop分支合并到master分支
  # repo: 仓库名称
  def initialize(user, repo, params={})
    @user   = user
    @repo   = repo
    @params = params
  end

  def call
    Rails.logger.info("######_____pr_url______#########{url}")
    post(url, request_params)
  end

  private


  def url
    "/repos/#{@user.login}/#{@repo}/pulls".freeze
  end

  def request_params
    Hash.new.merge(token: @user.gitea_token, data: @params)
  end
end
