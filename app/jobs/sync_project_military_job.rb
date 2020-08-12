require 'uri'
require 'net/http'

class SyncProjectMilitaryJob < ApplicationJob
  queue_as :default

  def perform(project, repository, project_socre)
    Rails.logger.info("============begin to sync project ===========")
    project_except_params = %w(praises_count watchers_count issues_count pull_requests_count versions_count issue_tags_count closed_issues_count)
    project_params = {
      project: project.as_json(except: project_except_params),
      repository: repository.as_json, 
      project_socre: project_socre.as_json
    }
    url = "http://47.93.212.82:49999/sync_forges"  #trustie上的相关路由
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.hostname, uri.port)
    http.use_ssl = false
    response = http.send_request('POST', uri.path, project_params.to_json, {'Content-Type' => 'application/json'})
    Rails.logger.info("============end to sync project, status: #{response.code} ===========")
  end
end
