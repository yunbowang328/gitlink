class Wechat::Weapp
  class << self
    attr_accessor :appid, :secret

    delegate :access_token, :jscode2session, to: :client

    def client
      @_client ||= Wechat::Client.new(appid, secret)
    end

    def session_key(openid)
      Rails.cache.read(session_key_cache_key(openid))
    end

    def write_session_key(openid, session_key)
      Rails.cache.write(session_key_cache_key(openid), session_key)
    end

    def verify?(openid, str, signature)
      session_key = session_key(openid)
      Digest::SHA1.hexdigest("#{str}#{session_key}") == signature
    end

    def decrypt(session_key, encrypted_data, iv)
      session_key = Base64.decode64(session_key)
      encrypted_data = Base64.decode64(encrypted_data)
      iv = Base64.decode64(iv)

      cipher = OpenSSL::Cipher::AES.new(128, :CBC)
      cipher.decrypt
      cipher.padding = 0
      cipher.key = session_key
      cipher.iv  = iv
      Rails.logger.info("[Weapp] encrypted_data: #{encrypted_data}")
      data = cipher.update(encrypted_data) << cipher.final
      Rails.logger.info("[Weapp] data: #{data}")
      result = JSON.parse(data[0...-data.last.ord])

      raise Wechat::Error.new(-1, '解密错误') if result.dig('watermark', 'appid') != appid
      result
    end

    private

    def session_key_cache_key(openid)
      "weapp:#{appid}:#{openid}:session_key"
    end
  end
end