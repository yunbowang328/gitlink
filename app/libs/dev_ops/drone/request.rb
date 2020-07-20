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
      validate_request_params!(endpoint)
      request(:get, endpoint, path, options)
    end

    def post(endpoint, path, options={})
      validate_request_params!(endpoint)
      request(:post, endpoint, path, options)
    end

    def put(endpoint, path, options={})
      validate_request_params!(endpoint)

    end

    def patch(url, params={})
      validate_request_params!(endpoint)
      request(:patch, endpoint, path, options)
    end

    def delete(endpoint, path, options={})
      validate_request_params!(endpoint)
      request(:delete, endpoint, path, options)
    end

    private
      def request(method, endpoint, path, **params)
        Rails.logger.info("[drone] request: #{method} #{path} #{params.except(:drone_token).inspect}")

        client ||= begin
          Faraday.new(url: endpoint) do |req|
            req.request :url_encoded
            req.headers['Content-Type'] = 'application/json'
            req.response :logger # 显示日志
            req.adapter Faraday.default_adapter
            req.authorization :Bearer, params[:drone_token]
            req.headers['Authorization']
          end
        end
        response = client.public_send(method, path, params.except(:drone_token))

        json_response(response)
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

      # Checks a base_uri and params for requests.
      def validate_request_params!(endpoint)
        raise "Please set an endpoint to API" unless endpoint
      end

      def error_message(response)
        "Server responded with code #{response.code}, message: #{response.parsed_response.message}. " \
        "Request URI: #{response.request.base_uri}#{response.request.path}"
      end

      def json_response(response)
        result = JSON.parse(response.body)
        status = response.status
        Rails.logger.info("[drone] response:#{status} #{result.inspect}")

        response.status != 200 ? result.merge!(status: response.status) : result
      end
  end
