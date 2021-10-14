module MulanossOauth
  class << self
    attr_accessor :client_id, :client_secret, :base_url, :redirect_uri

    def logger
      @_logger ||= STDOUT
    end

    def logger=(l)
      @_logger = l
    end

    def oauth_url
      "https://portal.mulanos.cn/api/auth/oschina?client_id=#{client_id}&redirect_uri=#{URI.encode_www_form_component(redirect_uri)}&response_type=code"
    end

  end
end
