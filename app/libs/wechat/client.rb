class Wechat::Client
  BASE_SITE = 'https://api.weixin.qq.com'.freeze

  attr_reader :appid, :secret

  def initialize(appid, secret)
    @appid  = appid
    @secret = secret
  end

  def access_token
    # 7200s 有效时间
    Rails.cache.fetch(access_token_cache_key, expires_in: 100.minutes) do
      result = request(:get, '/cgi-bin/token', appid: appid, secret: secret, grant_type: 'client_credential')
      result['access_token']
    end
  end

  def refresh_access_token
    Rails.cache.delete(access_token_cache_key)
    access_token
  end

  def jsapi_ticket
    # 7200s 有效时间
    Rails.cache.fetch(jsapi_ticket_cache_key, expires_in: 100.minutes) do
      result = request(:get, '/cgi-bin/ticket/getticket', access_token: access_token, type: 'jsapi')
      result['ticket']
    end
  end

  def refresh_jsapi_ticket
    Rails.cache.delete(jsapi_ticket_cache_key)
    jsapi_ticket
  end

  def jscode2session(code)
    request(:get, '/sns/jscode2session', appid: appid, secret: secret, js_code: code, grant_type: 'authorization_code')
  end

  def access_token_cache_key
    "#{base_cache_key}/access_token"
  end

  def jsapi_ticket_cache_key
    "#{base_cache_key}/jsapi_ticket"
  end

  def base_cache_key
    "wechat/#{appid}"
  end

  private

  def request(method, url, **params)
    Rails.logger.info("[wechat] request: #{method} #{url} #{params.except(:secret).inspect}")

    client = Faraday.new(url: BASE_SITE)
    response = client.public_send(method, url, params)
    result = JSON.parse(response.body)

    Rails.logger.info("[wechat] response:#{response.status} #{result.inspect}")

    if response.status != 200
      raise Wechat::Error.parse(result)
    end

    if result['errcode'].present? && result['errcode'].to_i.nonzero?
      raise Wechat::Error.parse(result)
    end

    result
  end
end