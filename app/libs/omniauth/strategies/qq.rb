module OmniAuth
  module Strategies
    class QQ < OmniAuth::Strategies::OAuth2
      option :client_options, {
        site: 'https://graph.qq.com',
        authorize_url: '/oauth2.0/authorize',
        token_url: '/oauth2.0/token'
      }
      option :token_params, { parse: :query }

      def request_phase
        super
      end

      def authorize_params
        super.tap do |params|
          %w[scope client_options].each do |v|
            if request.params[v]
              params[v.to_sym] = request.params[v]
            end
          end
        end
      end

      uid do
        @uid ||= begin
          access_token.options[:mode] = :query
          access_token.options[:param_name] = :access_token
          # Response Example: "callback( {\"client_id\":\"11111\",\"openid\":\"000000FFFF\"} );\n"
          response = access_token.get('/oauth2.0/me')

          matched = response.body.match(/"openid":"(?<openid>\w+)"/)
          matched[:openid]
        end
      end

      info do
        {
          name: user_info['nickname'],
          nickname: user_info['nickname'],
          image: user_info['figureurl_qq_1']
        }
      end

      extra do
        { raw_info: user_info }
      end

      def user_info
        access_token.options[:mode] = :query
        param = { oauth_consumer_key: options[:client_id], openid: uid, format: 'json' }
        @user_info ||= access_token.get('/user/get_user_info', params: param, parse: :json).parsed
      end
    end
  end
end
