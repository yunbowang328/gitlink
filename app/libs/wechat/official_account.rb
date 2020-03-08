class Wechat::OfficialAccount
  class << self
    attr_accessor :appid, :secret

    delegate :access_token, :jsapi_ticket, to: :client

    def js_sdk_signature(url, noncestr, timestamp)
      data = { jsapi_ticket: jsapi_ticket, noncestr: noncestr, timestamp: timestamp, url: url }
      str = data.map { |k, v| "#{k}=#{v}" }.join('&')
      Digest::SHA1.hexdigest(str)
    end

    def client
      @_client ||= Wechat::Client.new(appid, secret)
    end
  end
end