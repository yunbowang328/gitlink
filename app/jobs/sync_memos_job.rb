require 'uri'
require 'net/http'

class SyncMemosJob < ApplicationJob
  queue_as :default

  def perform(forum_id, main_url)
    SyncLog.sync_log("==========sync_memos_to_forge===forum_id==#{forum_id}=========")
    begin     
      url = "#{main_url}/sync_forges/get_memos"
      uri = URI.parse(url)
      http = Net::HTTP.new(uri.hostname, uri.port)
      http.use_ssl = main_url.include?("https")
      # headers = { "Content-Type" => "application/json" }
      sync_params = {
        forum_id: forum_id
      }
      response = http.send_request('GET', uri.path, sync_params.to_json, {'Content-Type' => 'application/json'})
      # response = http.get(uri.path,{forum_id: forum_id}.to_json, headers)

      if response.code == '200'
        target_jsons = eval(response.body)
        SyncLog.sync_log("==========sync_memos_jobs_target========#{target_jsons[:all_memos]}====")
        SyncCreateMemoJob.perform_later(target_jsons[:all_memos])
        # create_target(target_jsons[:all_memos])
      else
        SyncLog.sync_log("==========sync_memos_to_forge_failed============")
      end
    rescue => e
      SyncLog.sync_log("==========sync_memos_to_forge_failed=____2222===========errors:#{e}")
    end
  end

end
