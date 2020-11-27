class Gitea::PullRequest::CreateService < Gitea::ClientService
  attr_reader :token, :user, :repo, :params

  # 同一个项目下发送pr例子，如下：
  # 参数说明：
  #   user: 项目拥有者
  #   repo： 项目名称
  #   params:
  #   {
  # 	 title: 'pull request title',
  # 	 body: 'pull request content',
  # 	 head: 'develop', // from branch 源分支， 格式：branch
  # 	 base: 'master'   // to branch 目标分支
  #   }
  #  以上列子说明从develop分支合并到master分支
  #  Gitea::PullRequest::CreateService.call('token', '项目拥有者', '项目名称', params)

  # fork的项目，向源项目发送pr例子，如下：
  # 参数说明：
  #   user：源项目拥有者
  #   repo：源项目仓库名称
  #   params:
  #   {
  #     "base": "develop", // to branch 目标分支
  #     "head": "jasder:master", // from branch 源分支，格式：username:branch
  #     "body": "像源项目发送pr",
  #     "title": "jasder用户向源项目发送pr"
  #   }
  #  以上例子说明：jasder用户fork的项目master分支向源项目的develop分支发送pr
  #  Gitea::PullRequest::CreateService.call('token', '源项目拥有者', '源项目名称', params)
  def initialize(token, user, repo, params={})
    @token = token
    @user   = user
    @repo   = repo
    @params = params
  end

  def call
    post(url, request_params)
  end

  private

  def url
    "/repos/#{@user.login}/#{@repo}/pulls".freeze
  end

  def request_params
    Hash.new.merge(token: token, data: @params)
  end
end
