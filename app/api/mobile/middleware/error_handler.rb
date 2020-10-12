#coding=utf-8


module Mobile
  module Middleware
    class ErrorHandler < Grape::Middleware::Base
      def call!(env)
        @env = env
        begin
          @app.call(@env)
        rescue =>e
          code = -1

          message = {status: code, message: e.message }.to_json
          
          Rails.logger.error e.inspect
          Rails.logger.error e.backtrace.join("\n")
          status = 200
          headers = { 'Content-Type' => content_type }
          Rack::Response.new([message], status, headers).finish
          # throw :error, :message => e.message || options[:default_message], :status => 500
        end
      end
    end
  end
end
