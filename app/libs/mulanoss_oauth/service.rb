require 'oauth2'

module MulanossOauth::Service
  module_function

  def request(method, url, params)
    begin
      Rails.logger.info("[MulanossOauth] [#{method.to_s.upcase}] #{url} || #{params}")

      client = Faraday.new(url: MulanossOauth.base_url)
      response = client.public_send(method, url, params)
      result = JSON.parse(response.body)

      Rails.logger.info("[MulanossOauth] [#{response.status}] #{result}")

      result
    rescue Exception => e
      raise Educoder::TipException.new(e.message)
    end
  end

  def access_token(code)
    begin
      Rails.logger.info("[MulanossOauth] [code] #{code} ")
      Rails.logger.info("[MulanossOauth] [redirect_uri] #{MulanossOauth.redirect_uri} ")
      client = OAuth2::Client.new(MulanossOauth.client_id, MulanossOauth.client_secret, site: MulanossOauth.base_url, token_url:"/action/openapi/token")
      result = client.auth_code.get_token(code, redirect_uri: MulanossOauth.redirect_uri).to_hash
      Rails.logger.info("[MulanossOauth] [GetToken] #{result[:access_token]}")
      return result
    rescue Exception => e
      raise Educoder::TipException.new(e.message)
    end
  end

  def user_info(access_token)
    request(:get, '/action/openapi/user', {access_token: access_token})
  end
end
