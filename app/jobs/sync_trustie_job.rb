require 'uri'
require 'net/http'

class SyncTrustieJob < ApplicationJob
  queue_as :default

  def perform(type, count)
    Rails.logger.info("#######_________response__sync__start__#########")

    token = EduSetting.get('trustie_api_token')
    api_host = EduSetting.get('trustie_api_url')

    url = "#{api_host}/api/v1/homes/sync_count"
    sync_json = {
      "token": token,
      "type": type,
      "number": count
    }
    uri = URI.parse(url)
    # http = Net::HTTP.new(uri.hostname, uri.port)

    if api_host
      http = Net::HTTP.new(uri.hostname, uri.port)

      if api_host.include?("https://")
        http.use_ssl = true
      end

      response = http.send_request('PUT', uri.path, sync_json.to_json, {'Content-Type' => 'application/json'})
      Rails.logger.info("#######_________response__sync__end_____#########{response.body}")
    end
  end
end
