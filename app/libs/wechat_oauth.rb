module WechatOauth
  class << self
    attr_accessor :appid, :secret, :scope, :base_url

    def logger
      @_logger ||= STDOUT
    end

    def logger=(l)
      @_logger = l
    end
  end
end