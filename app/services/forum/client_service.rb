class Forum::ClientService < ApplicationService
  attr_reader :url, :params

  PAGINATE_DEFAULT_PAGE  = 1
  PAGINATE_DEFAULT_LIMIT = 20

  def initialize(options={})
    @url      = options[:url]
    @params   = options[:params]
  end

  def get(url, params={})
    conn(params).get do |req|
      req.url full_url(url, 'get')
      params.except(:token).each_pair do |key, value|
        req.params["#{key}"] = value
      end
    end

    # response.headers.each do |k,v|
    #   puts "#{k}:#{v}"
    # end #=> 响应头
  end

  private
  def conn(auth={})
    @client ||= begin
      Faraday.new(url: domain) do |req|
        req.request :url_encoded
        req.headers['Content-Type'] = 'application/json'
        req.response :logger # 显示日志
        req.adapter Faraday.default_adapter
      end
    end
    @client
  end

  def base_url
    Forum.forum_config[:base_url]
  end

  def domain
    Forum.forum_config[:domain]
  end

  def api_url
    [domain, base_url].join('')
  end

  def full_url(api_rest, action='post')
    url = [api_url, api_rest].join('').freeze
    url = action === 'get' ? url : URI.escape(url)
    url = URI.escape(url) unless url.ascii_only?
    puts "[forum] request url: #{url}"
    return url
  end

  def render_response(response)
    status = response.status
    body = response&.body

    # log_error(status, body)

    body, message = get_body_by_status(status, body)

    [status, message, body]
  end

  def get_body_by_status(status, body)
    body, message =
      case status
      when 401 then [nil, "401"]
      when 404 then [nil, "404"]
      when 403 then [nil, "403"]
      when 500 then [nil, "500"]
      else
        if body.present?
          body = JSON.parse(body)
          fix_body(body)
        else
          nil
        end
      end

    [body, message]
  end

  def fix_body(body)
    return [body, nil] if body.is_a?(Array) || body.is_a?(Hash)

    body['message'].blank? ? [body, nil] : [nil, body['message']]
  end

end
