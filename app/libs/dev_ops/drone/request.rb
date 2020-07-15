  class DevOps::Drone::Request
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

    def get(endpoint, path, options={})
      set_request_defaults(endpoint)
      request(:get, endpoint, path, options)
    end

    def post(endpoint, path, options={})
      set_request_defaults(endpoint)
      request(:post, endpoint, path, options)
    end

    def put(endpoint, path, options={})
      set_request_defaults(endpoint)
      request(:put, endpoint, path, options)
    end

    def delete(endpoint, path, options={})
      set_request_defaults(endpoint)
      request(:delete, endpoint, path, options)
    end

    private
      def request(method, endpoint, path, **params)
        Rails.logger.info("[drone] request: #{method} #{path} #{params.except(:secret).inspect}")

        client = Faraday.new(path: domain)
        response = client.public_send(method, path, params)
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

      # Sets a base_uri and default_params for requests.
      # @raise [Error::MissingCredentials] if endpoint not set.
      def set_request_defaults(endpoint, private_token, sudo=nil)
        raise "Please set an endpoint to API" unless endpoint
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

      def error_message(response)
        "Server responded with code #{response.code}, message: #{response.parsed_response.message}. " \
        "Request URI: #{response.request.base_uri}#{response.request.path}"
      end
  end
