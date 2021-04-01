require 'oauth2'

module EducoderOauth::Service
  module_function

  def request(method, url, params)
    begin 
      Rails.logger.info("[EducoderOauth] [#{method.to_s.upcase}] #{url} || #{params}")

      client = Faraday.new(url: EducoderOauth.base_url)
      response = client.public_send(method, url, params)
      result = JSON.parse(response.body)

      Rails.logger.info("[EducoderOauth] [#{response.status}] #{result}")

      result
    rescue Exception => e
      raise Educoder::TipException.new(e.message)
    end
  end

  def access_token(code, redirect_uri)
    begin
      Rails.logger.info("[EducoderOauth] [code] #{code} ")
      Rails.logger.info("[EducoderOauth] [redirect_uri] #{redirect_uri} ")
      client = OAuth2::Client.new(EducoderOauth.client_id, EducoderOauth.client_secret, site: EducoderOauth.base_url)
      result = client.auth_code.get_token(code, redirect_uri: redirect_uri).to_hash
      return result
    rescue Exception => e
      raise Educoder::TipException.new(e.message)
    end
  end

  def user_info(access_token)
    request(:get, '/api/users/info.json', {access_token: access_token})
  end
end