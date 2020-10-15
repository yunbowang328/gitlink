require 'uri'
require 'net/http'

class SyncForumsRake
  # 运行示例: bundle exec rails runner "SyncForumsRake.new.call()"

  def call
    SyncLog.sync_log("==========begin_to_sync_forums=============")
    begin     
      # url = "https://www.trustie.net/sync_forges/get_forums"  #trustie上的相关路由
      main_url = "https://www.trustie.net"
      url = "#{main_url}/sync_forges/get_forums"
      uri = URI.parse(url)
      http = Net::HTTP.new(uri.hostname, uri.port)
      http.use_ssl = main_url.include?("https")
      headers = { "Content-Type" => "application/json" }
      response = http.get(uri.path, headers)
      # response = http.send_request('GET', uri.path,{'Content-Type' => 'application/json'})

      if response.code == '200'
        target_jsons = eval(response.body)
        create_target(target_jsons[:all_forums], main_url)
      else
        SyncLog.sync_log("==========sync_forums_to_forge_failed============")
      end
    rescue => e
      SyncLog.sync_log("==========sync_forums_to_forge_failed============errors:#{e}")
    end
  end

  def create_target(targets, main_url)
    
    curreunt_sections = ForumSection.all
    positions = curreunt_sections.pluck(:position).select { |a| a.is_a? Integer }
    positions = positions.max.to_i
    targets.each_with_index do |t, index| 
      section_params = {
        id: t[:id],
        title: t[:name],
        position: positions + index + 1, 
        description: t[:description],
        user_id: t[:creator_id]
      }
      if curreunt_sections.exists?(t[:id])
        current_section = curreunt_sections.where(id: t[:id]).first
        if current_section.update_attributes(section_params)
          SyncMemosJob.perform_later(t[:id], main_url)
        end
      else 
        section = ForumSection.new(section_params)
        if section.save!
          SyncMemosJob.perform_later(section.id, main_url)
        end
      end
    end
  end
end