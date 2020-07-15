  # @private
  class DevOps::Drone::Request
    # format :json
    # headers 'Accept' => 'application/json'
    # parser Proc.new { |body, _| parse(body) }


    # Converts the response body to an ObjectifiedHash.
    def self.parse(body)
      body = decode(body)

      if body.is_a? Hash
        ObjectifiedHash.new body
      elsif body.is_a? Array
        body.collect! { |e| ObjectifiedHash.new(e) }
      elsif body == true
        body
      else
        raise Error::Parsing.new "Couldn't parse a response body"
      end
    end

    # Decodes a JSON response into Ruby object.
    def self.decode(response)
      begin
        JSON.load response
      rescue JSON::ParserError
        raise Error::Parsing.new "The response is not a valid JSON"
      end
    end

    def get(path, options={})
      set_httparty_config(options)
      set_private_token_header(options)
      validate self.class.get(path, options)
    end

    def post(path, options={})
      set_httparty_config(options)
      set_private_token_header(options, path)
      validate self.class.post(path, options)
    end

    def put(path, options={})
      set_httparty_config(options)
      set_private_token_header(options)
      validate self.class.put(path, options)
    end

    def delete(path, options={})
      set_httparty_config(options)
      set_private_token_header(options)
      validate self.class.delete(path, options)
    end

    # Checks the response code for common errors.
    # Returns parsed response for successful requests.
    def validate(response)
      # case response.code
      #   when 400; raise Error::BadRequest.new error_message(response)
      #   when 401; raise Error::Unauthorized.new error_message(response)
      #   when 403; raise Error::Forbidden.new error_message(response)
      #   when 404; raise Error::NotFound.new error_message(response)
      #   when 405; raise Error::MethodNotAllowed.new error_message(response)
      #   when 406; raise Error::DataNotAccepted.new error_message(response)
      #   when 409; raise Error::Conflict.new error_message(response)
      #   when 500; raise Error::InternalServerError.new error_message(response)
      #   when 502; raise Error::BadGateway.new error_message(response)
      #   when 503; raise Error::ServiceUnavailable.new error_message(response)
      # end

      response.parsed_response
    end

    # Sets a base_uri and default_params for requests.
    # @raise [Error::MissingCredentials] if endpoint not set.
    def set_request_defaults(endpoint, private_token, sudo=nil)
      raise Error::MissingCredentials.new("Please set an endpoint to API") unless endpoint
      @private_token = private_token

      self.class.base_uri endpoint
      self.class.default_params :sudo => sudo
      self.class.default_params.delete(:sudo) if sudo.nil?
    end

    def request(method, domain, url, **params)
      Rails.logger.info("[drone] request: #{method} #{url} #{params.except(:secret).inspect}")

      client = Faraday.new(url: domain)
      response = client.public_send(method, url, params)
      result = JSON.parse(response.body)

      Rails.logger.info("[drone] response:#{response.status} #{result.inspect}")

      if response.status != 200
        raise DevOps::Drone::Error.parse(result)
      end

      if result['errcode'].present? && result['errcode'].to_i.nonzero?
        raise DevOps::Drone::Error.parse(result)
      end

      result
    end

    private
      def conn(auth={})
        token = auth[:token]
        puts "[gitea]    token: #{token}"

        @client ||= begin
          Faraday.new(url: domain) do |req|
            req.request :url_encoded
            req.headers['Content-Type'] = 'application/json'
            req.response :logger # 显示日志
            req.adapter Faraday.default_adapter
            req.authorization :Bearer, token
            req.headers['Authorization']
          end
        end
        @client
      end

      # Sets a PRIVATE-TOKEN header for requests.
      # @raise [Error::MissingCredentials] if private_token not set.
      def set_private_token_header(options, path=nil)
        unless path == '/session'
          raise Error::MissingCredentials.new("Please set a private_token for user") unless @private_token
          options[:headers] = {'PRIVATE-TOKEN' => @private_token}
        end
      end

      # Set HTTParty configuration
      # @see https://github.com/jnunemaker/httparty
      def set_httparty_config(options)
        if self.httparty
          options.merge!(self.httparty)
        end
      end

      def error_message(response)
        "Server responded with code #{response.code}, message: #{response.parsed_response.message}. " \
        "Request URI: #{response.request.base_uri}#{response.request.path}"
      end
  end
