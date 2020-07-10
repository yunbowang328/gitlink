require 'uri'
require 'net/http'

class SyncProjectsJob < ApplicationJob
  queue_as :default

  def perform(sync_params, gitea_main)
    SyncLog.sync_log("==========begin to sync #{sync_params[:type]} to forge============")
    SyncLog.sync_log("==========sync_params:#{sync_params}============")

    begin     
      url = "#{gitea_main}/sync_forges"  #trustie上的相关路由

      uri = URI.parse(url)
      http = Net::HTTP.new(uri.hostname, uri.port)
      http.use_ssl = true
      response = http.send_request('GET', uri.path, sync_params.to_json, {'Content-Type' => 'application/json'})

      SyncLog.sync_log("==========response_status::#{response.code}============")
      if response.code == '200'
        target_jsons = eval(response.body)
        if sync_params[:type] == "Project"
          SyncLog.sync_log("==========target_jsons: #{target_jsons}============")
          update_new_project(target_jsons[:targets_params][0], sync_params[:new_project_id])
        else
          create_target(target_jsons[:targets_params], sync_params[:type].to_s)
        end
      else
        SyncLog.sync_log("==========sync_project_to_forge_failed #{sync_params[:type]}============")
      end
    rescue => e
      SyncLog.sync_log("==========sync_project_to_forge_failed #{sync_params[:type]}============errors:#{e}")
    end
  end

  private

  def update_new_project(re, project_id)
    SyncLog.sync_log("=========begin_to_update_project=project_id: #{project_id}============")
    project = Project.find_by(id: project_id)
    project.update(re[:target_params]) if re[:target_params].present?
    create_target(re[:issues_params], "Issue") if re[:issues_params].present?
    create_target(re[:member_params], "Member") if re[:member_params].present?
    create_target(re[:versions_params], "Version") if re[:versions_params].present?
    create_target(re[:watcher_params], "Watcher") if re[:watcher_params].present?
    create_target(re[:praise_treads], "PraiseTread") if re[:praise_treads].present?
  end


  def create_target(target_jsons, target_type)
    SyncLog.sync_log("***【#{target_type}】. begin_to_create_target---------------")
    return SyncLog.sync_log("*** no target_jsons") if target_jsons.blank?
    target_jsons.each do |re|
      if re[:target_params].present?
        SyncLog.sync_log("***user_login:#{re[:user_login]}----target_type:#{target_type}")
        u_id = User.select(:id, :login).where(login: re[:user_login]).pluck(:id).first
        new_target = target_type.constantize.new(re[:target_params].merge(user_id: u_id))
        
        if target_type == "Issue"
          assing_u_id = User.select(:id, :login).where(login: re[:assign_login]).pluck(:id).first
          new_target.assigned_to_id = assing_u_id
          if re[:journals].present?
            create_target(re[:journals], "Journal")
          end
        end
        if new_target.save!
          if re[:journal_details].present?
            re[:journal_details].each do |j|
              JournalDetail.create!(j[:journal_detail].merge(journal_id: new_target.id))
            end
          end
        end
      end
    end
    SyncLog.sync_log("***111222. end_to_create_target---------------")
  end
end