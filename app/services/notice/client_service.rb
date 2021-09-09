class Notice::ClientService < ApplicationService
  attr_reader :url, :params 

  def initialize(options={})
    @url = options[:url]
    @params = options[:params]
  end

  def post(url, params={})
    puts "[notice][POST] request params: #{params}"
    conn.post do |req|
      req.url = full_url(url)
      req.body = params[:data].to_json 
    end
  end

  def get(url, params={})
    puts "[notice][GET] request params: #{params}"
    conn.get do |req|
      req.url full_url(url, 'get')
      params.each_pair do |key, value|
        req.params["#{key}"] = value
      end
    end
  end

  def delete(url, params={})
    puts "[notice][DELETE] request params: #{params}"
    conn.delete do |req|
      req.url full_url(url)
      reb.body = params[:data].to_json
    end
  end

  def patch(url, params={})
    puts "[notice][PATCH] request params: #{params}"
    conn.patch do |req|
      req.url full_url(url)
      reb.body = params[:data].to_json
    end
  end

  def put(url, params={})
    puts "[notice][PUT] request params: #{params}"
    conn.put do |req|
      req.url full_url(url)
      reb.body = params[:data].to_json
    end
  end

  #private 
  def conn
    @client ||= begin
      Faraday.new(url: domain) do |req|
        req.request :url_encoded
        req.headers['Content-Type'] = 'application/json'
        req.adapter Faraday.default_adapter
      end
    end

    @client
  end

  def base_url 
    Notice.notice_config[:base_url]
  end

  def domain
    Notice.notice_config[:domain]
  end

  def platform 
    Notice.notice_config[:platform]
  end

  def api_url
    [domain, base_url].join('')
  end

  def full_url(api_rest, action='post')
    url = [api_url, api_rest].join('').freeze
    url = action === 'get' ? url : URI.escape(url)
    url = URI.escape(url) unless url.ascii_only?
    puts "[notice] request url: #{url}"
    return url
  end
  
  def log_error(status, body)
    puts "[notice] status:  #{status}"
    puts "[notice] body:    #{body&.force_encoding('UTF-8')}"
  end

  def render_response(response)
    status = response.status
    body = response&.body

    log_error(status, body)

    if status == 200 
      if body["code"] == 1
        return [body["code"], body["message"], body["data"]]
      else 
        puts "[notice][ERROR] code: #{body["code"]}"
        puts "[notice][ERROR] message: #{body["message"]}"
      end
    end
  end
end