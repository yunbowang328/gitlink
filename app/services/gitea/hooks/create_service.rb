class Gitea::Hooks::CreateService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :body

  # body params:
    # {
    #   "active": false,
    #   "branch_filter": "string",
    #   "config": {
    #     "content_type": "string",
    #     "url": "string"
    #   },
    #   "events": [
    #     "create"
    #   ],
    #   "type": "gitea"
    # }
  # eg:
  #  Gitea::Hooks::CreateService.call(user.gitea_token, user.login, repo.identifier, body)
  def initialize(token, owner, repo, body)
    @token = token
    @owner = owner
    @repo  = repo
    @body  = body
  end

  def call
    post(url, params)
  end

  private
  def params
    Hash.new.merge(token: token, data: body).compact
  end

  def url
    "/repos/#{owner}/#{repo}/hooks".freeze
  end

end
