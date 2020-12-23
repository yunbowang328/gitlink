class Gitea::PullRequest::CreateService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :params

  # 同一个项目下发送pr例子，如下：
  # 参数说明：
  #   owner: 项目拥有者
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
  #   owner：源项目拥有者
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
  def initialize(token, owner, repo, params={})
    @token  = token
    @owner  = owner
    @repo   = repo
    @params = params
  end

  def call
    response = post(url, request_params)
    json_format(response)
  end

  private

  def url
    "/repos/#{@owner}/#{@repo}/pulls".freeze
  end

  def request_params
    Hash.new.merge(token: token, data: @params)
  end

  def json_format(response)
    status, message, body = render_response(response)

    status === 201 ? success(body) : error(message, status)
  end
end
