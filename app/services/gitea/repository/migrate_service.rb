class Gitea::Repository::MigrateService < Gitea::ClientService
  attr_reader :token, :params

  # params description:
  # {
  #   auth_username	string
  #   clone_addr*	string #clone地址
  #   description	string
  #   issues	boolean
  #   labels	boolean
  #   milestones	boolean
  #   mirror	boolean
  #   private	boolean
  #   pull_requests	boolean
  #   releases	boolean
  #   repo_name*	string #仓库名称
  #   uid*	integer($int64) #gitea用户id或组织id
  #   wiki	boolean
  # }
  # EX:
  # params = {
  #   clone_addr: 'xxx.com',
  #   repo_name: 'repo_name',
  #   uid: 2,
  #   private: false
  # }

  def initialize(token, params)
    @token = token
    @params = params
  end

  def call
    response = post(url, request_params)

    render_response(response)
  end

  private

  def request_params
    Hash.new.merge(token: token, data: params)
  end

  def url
    "/repos/migrate".freeze
  end

end
