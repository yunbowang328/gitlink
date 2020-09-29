class Gitea::ClientService < ApplicationService
  attr_reader :username, :secret, :token, :url, :params

  PAGINATE_DEFAULT_PAGE  = 1
  PAGINATE_DEFAULT_LIMIT = 20

  def initialize(options={})
    @username = options[:username]
    @secret   = options[:password]
    @token    = options[:token]
    @url      = options[:url]
    @params   = options[:params]
  end

  # params
  # EXA:
  # {
  #   token: {},
  #   data: {}
  # }
  def post(url, params={})
    puts "[gitea] request params: #{params}"
    auth_token = authen_params(params[:token])
    response = conn(auth_token).post do |req|
      req.url "#{request_url}"
      req.body = params[:data].to_json
    end
    render_status(response)
  end

  def get(url, params={})
    auth_token = authen_params(params[:token])
    conn(auth_token).get do |req|
      req.url full_url(url, 'get')
      params.except(:token).each_pair do |key, value|
        req.params["#{key}"] = value
      end
    end

    # response.headers.each do |k,v|
    #   puts "#{k}:#{v}"
    # end #=> 响应头
  end

  def delete(url, params={})
    auth_token = authen_params(params[:token])
    conn(auth_token).delete do |req|
      req.url full_url(url)
      req.body = params[:data].to_json
    end
  end

  def patch(url, params={})
    puts "[gitea] request params: #{params}"
    auth_token = authen_params(params[:token])
    conn(auth_token).patch do |req|
      req.url full_url(url)
      req.body = params[:data].to_json
    end
  end

  def put(url, params={})
    puts "[gitea] put request params: #{params}"
    conn(authen_params(params[:token])).put do |req|
      req.url full_url(url)
      req.body = params[:data].to_json
    end
  end

  private
  def conn(auth={})
    username = auth[:username] || access_key_id
    secret = auth[:password] || access_key_secret
    token = auth[:token]
    puts "[gitea] username: #{username}"
    puts "[gitea]   secret: #{secret}"
    puts "[gitea]    token: #{token}"

    @client ||= begin
      Faraday.new(url: domain) do |req|
        req.request :url_encoded
        req.headers['Content-Type'] = 'application/json'
        req.response :logger # 显示日志
        req.adapter Faraday.default_adapter
        if token.blank?
          req.basic_auth(username, secret)
        else
          req.authorization :Bearer, token
          req.headers['Authorization']
        end
      end
    end
    @client
  end

  def base_url
    Gitea.gitea_config[:base_url]
  end

  def domain
    Gitea.gitea_config[:domain]
  end

  def access_key_id
    Gitea.gitea_config[:access_key_id]
  end

  def access_key_secret
    Gitea.gitea_config[:access_key_secret]
  end

  def api_url
    [domain, base_url].join('')
  end

  def full_url(api_rest, action='post')
    url = [api_url, api_rest].join('').freeze
    url = action === 'get' ? url : URI.escape(url)
    puts "[gitea] request url: #{url}"
    return url
  end

  def render_status(response)
    puts "[gitea] response status: #{response.status}"
    mark = "[gitea] "
    case response.status
    when 201, 200, 202
      if response.body.size > 0
        JSON.parse(response&.body)
      else
        {status: 200}
      end
    when 401
      ""
      raise Error, mark + "401"
    when 422
      result = JSON.parse(response&.body)
      puts "[gitea] parse body: #{result}"
      # return {status: -1, message: result[0]}
      raise Error, result[0]
    when 204

      puts "[gitea] "
      raise Error, "[gitea] delete ok"
    when 409
      message = "创建失败，请检查该分支合并是否已存在"
      raise Error, mark + message
    when 403
      {status: 403, message: '你没有权限操作!'}
    else
      if response&.body.blank?
        message = "请求失败"
      else
        result = JSON.parse(response&.body)
        message = result['message']
      end
      raise Error, mark + message
    end
  end

  def authen_params(token)
    (token.is_a? String) ? {token: token} : Hash(token)
  end

  def render_data(response)
    case response.status
    when 201, 200
      JSON.parse(response.body)
    else
      nil
    end
  end
end
