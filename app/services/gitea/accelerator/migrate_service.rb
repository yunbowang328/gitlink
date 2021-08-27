class Gitea::Accelerator::MigrateService < Gitea::Accelerator::BaseService
  attr_reader :params

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

  def initialize(params)
    @params = params
  end

  def call
    return error('[gitea:] accelerator config missing') if check_accelerator!
    response = post(url, request_params)

    render_status(response)
  end


  private
  def request_params
    {
      uid: access_uid,
      clone_addr: params[:clone_addr],
      repo_name: params[:repository_name],
      auth_username: params[:auth_username],
      auth_password: Base64.decode64(params[:auth_password]),
      mirror: ActiveModel::Type::Boolean.new.cast(params[:is_mirror])
    }
  end

  def url
    "/repos/migrate".freeze
  end
end