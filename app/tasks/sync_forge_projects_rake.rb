require 'uri'
require 'net/http'

class SyncForgeProjectsRake
  # 运行示例: 检查哪些项目的repo不存在，bundle exec rails runner "SyncForgeProjectsRake.new.call(5)"
  
    def call(count)
      url = "https://forgeplus.trustie.net/api/sync_forge/sync_range_projects"  #trustie上的相关路由
      count_params = {
        sync_count: count || 10
      }
      uri = URI.parse(url)
      http = Net::HTTP.new(uri.hostname, uri.port)
      http.use_ssl = true
      response = http.send_request('POST', uri.path, count_params.to_json, {'Content-Type' => 'application/json'})
      Rails.logger.info("============end to sync project, status: #{response.code} ===========")


    end
  end