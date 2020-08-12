require 'uri'
require 'net/http'

class SyncProjectMilitaryJob < ApplicationJob
  queue_as :default

  def perform(project, repository, project_socre)
    SyncLog.sync_log("============begin to sync project ===========")
    project_except_params = %w(id user_id praises_count watchers_count issues_count pull_requests_count versions_count issue_tags_count closed_issues_count)
    project_params = {
      project: project.as_json(except: project_except_params),
      repository: repository.as_json(except: %w(id project_id login user_id)), 
      project_socre: project_socre.as_json(except: %w(id project_id))
    }
    url = "http://39.105.176.215:49999/api/sync_forge/sync_projects"  #trustie上的相关路由
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.hostname, uri.port)
    http.use_ssl = false
    response = http.send_request('POST', uri.path, project_params.to_json, {'Content-Type' => 'application/json'})
    SyncLog.sync_log("============end to sync project, status: #{response.code} ===========")
  end
end
