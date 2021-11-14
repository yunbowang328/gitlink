#coding=utf-8

require 'net/http'
require 'uri'

module Gitlink
  module Http

    def get(url)
      uri = URI(url)
      res = Net::HTTP.start(uri.host, uri.port, use_ssl: url.start_with?('https')) do |http|
        req = Net::HTTP::Get.new(uri)
        #req['Content-Type'] = 'application/json'
        # The body needs to be a JSON string, use whatever you know to parse Hash to JSON
        #req.body = {a: 1}.to_json
        http.request(req)
      end

      res.body
    end

    def post(url, data=nil)
      uri = URI(url)
      res = Net::HTTP.start(uri.host, uri.port, use_ssl: url.start_with?('https')) do |http|
        req = Net::HTTP::Post.new(uri)
        #req['Content-Type'] = 'application/json'
        # The body needs to be a JSON string, use whatever you know to parse Hash to JSON
        req.body = data if data
        http.request(req)
      end

      res.body
    end

    def decode(res)
      begin
        obj = ActiveSupport::JSON.decode(res)
      rescue ActiveSupport::JSON.parse_error
        logger.error("Attempted to decode invalid JSON: #{res}")
      end
    end
  end
end