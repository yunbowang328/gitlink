class Educoder::ClientService < ApplicationService
  attr_reader :url, :params

  PAGINATE_DEFAULT_PAGE  = 1
  PAGINATE_DEFAULT_LIMIT = 20

  def initialize(options={})
    @url      = options[:url]
    @params   = options[:params]
  end

  def post(url, params={})
    puts "[educoder] request params: #{params}"
    auth_token = authen_params(params[:token])
    response = conn(auth_token).post do |req|
      req.url full_url(url)
      req.body = params[:data].to_json
    end
    render_status(response)
  end

  def get(url, params={})
    puts "[educoder] params: #{params}"
    conn(api_url(url), params)
  end

  def delete(url, params={})
    auth_token = authen_params(params[:token])
    conn(auth_token).delete do |req|
      req.url full_url(url)
      req.body = params[:data].to_json
    end
  end

  def patch(url, params={})
    puts "[educoder] request params: #{params}"
    auth_token = authen_params(params[:token])
    conn(auth_token).patch do |req|
      req.url full_url(url)
      req.body = params[:data].to_json
    end
  end

  def put(url, params={})
    puts "[educoder] put request params: #{params}"
    conn(authen_params(params[:token])).put do |req|
      req.url full_url(url)
      req.body = params[:data].to_json
    end
  end

  private
  def conn(url, hash={})
    par = []
    hash.each do |k,v|
      par << "#{k}=#{v}"
    end

    uri = URI("#{url}.json?#{par.join('&')}&private_token=#{private_token}")
    puts "[educoder] request_url: #{uri}"
    response = Net::HTTP.get_response(uri)
    puts "[educoder] response code: #{response.code.to_i}"
    if response.code.to_i != 200
      puts "======= 接口请求失败！"
      raise '接口请求失败.'
      return nil
    end
    JSON.parse(response.body)
  end

  def base_url
    Rails.application.config_for(:configuration)['educoder']['base_url']
  end

  def domain
    Rails.application.config_for(:configuration)['educoder']['main_site']
  end

  def private_token
    Rails.application.config_for(:configuration)['educoder']['token']
  end

  def access_key_secret
    Gitea.gitea_config[:access_key_secret]
  end

  def api_url(url)
    [domain, base_url, url].join('/')
  end

  def full_url(api_rest, action='post')
    url = [api_url, api_rest].join('').freeze
    url = action === 'get' ? url : URI.escape(url)
    puts "[gitea] request url: #{url}"
    return url
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
