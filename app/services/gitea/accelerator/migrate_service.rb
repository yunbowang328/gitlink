class Gitea::Accelerator::MigrateService < ApplicationService
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
      auth_password: params[:auth_password],
      mirror: ActiveModel::Type::Boolean.new.cast(params[:is_mirror])
    }
  end

  def url
    "/repos/migrate".freeze
  end

  def post(url, params)
    puts "[gitea] request params: #{params}"
    puts "[gitea] access_username: #{access_username}"
    puts "[gitea] access_password: #{access_password}"
    conn.post do |req|
      req.url full_url(url)
      req.body = params.to_json
    end
  end

  def conn
    @client ||= begin
      Faraday.new(url: domain) do |req|
        req.request :url_encoded
        req.headers['Content-Type'] = 'application/json'
        req.response :logger # 显示日志
        req.adapter Faraday.default_adapter
        req.basic_auth(access_username, access_password)
      end
    end
    @client
  end

  def base_url
    accelerator["base_url"]
  end

  def domain
    accelerator["domain"]
  end

  def api_url
    [domain, base_url].join('')
  end

  def full_url(api_rest, action='post')
    url = [api_url, api_rest].join('').freeze
    url = action === 'get' ? url : URI.escape(url)
    puts "[gitea] request url: #{url}"
    url
  end

  def access_username
    accelerator["access_key_id"]
  end

  def access_password
    accelerator["access_key_secret"]
  end

  def access_uid
    accelerator["access_admin_uid"]
  end

  def accelerator
    Gitea.gitea_config[:accelerator]
  end

  def render_status(response)
    puts "[gitea] response status: #{response.status}"
    puts "[gitea] response body: #{response.body}"
    case response.status
    when 201
      success
    when 403
      error('APIForbiddenError')
    when 422
      error('APIValidationError')
    else
      error("MigrateError")
    end
  end

  def error(message)
    {
      status: :error,
      message: message,
      data: nil
    }
  end

  def success(data=nil)
    {
      status: :success,
      message: nil,
      data: data
    }
  end

  def check_accelerator!
    accelerator.blank? || access_username.blank? || access_password.blank? || domain.blank?
  end
end