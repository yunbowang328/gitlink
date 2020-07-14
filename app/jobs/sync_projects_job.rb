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
          SyncLog.sync_project_log("==========target_jsons: #{target_jsons}============")
          update_new_project(target_jsons[:targets_params][0], sync_params[:new_project_id])
        else
          SyncLog.sync_project_log("========== #{sync_params[:type]}============")
          create_target(target_jsons[:targets_params], sync_params[:type].to_s)
        end
      else
        SyncLog.sync_project_log("==========sync_project_to_forge_failed #{sync_params[:type]}============")
      end
    rescue => e
      SyncLog.sync_project_log("==========sync_project_to_forge_failed #{sync_params[:type]}============errors:#{e}")
    end
  end

  private

  def update_new_project(re, project_id)
    SyncLog.sync_log("=========begin_to_update_project=project_id: #{project_id}============")
    project = Project.find_by(id: project_id)
    project.update(re[:target_params]) if re[:target_params].present?
    create_target(re[:issues_params], "Issue") if re[:issues_params].present?
    create_target(re[:member_params], "Member") if re[:member_params].present?
    create_target(re[:watcher_params], "Watcher") if re[:watcher_params].present?
    create_target(re[:praise_treads], "PraiseTread") if re[:praise_treads].present?
    create_versions(project, re[:versions_params]) if re[:versions_params].present?
  end

  def create_target(target_jsons, target_type)
    begin
      SyncLog.sync_project_log("***【#{target_type}】. begin_to_create_target---------------")
      return SyncLog.sync_log("*** no target_jsons") if target_jsons.blank?
      target_jsons.each_with_index do |re,index|
        SyncLog.sync_project_log("***user_login:#{re[:user_login]}----target_type:#{target_type}-----#{index+1}")
        if re[:target_params].present?
          SyncLog.sync_log("***user_login:#{re[:user_login]}----target_type:#{target_type}")
          u_id = User.select(:id, :login).where(login: re[:user_login]).pluck(:id).first
          re[:target_params].delete(:id)
          if target_type == "Issue"
            new_target = target_type.constantize.new(re[:target_params].merge(author_id: u_id))
          else
            new_target = target_type.constantize.new(re[:target_params].merge(user_id: u_id))
          end
          
          if target_type == "Issue"
            assing_u_id = User.select(:id, :login).where(login: re[:assign_login]).pluck(:id).first
            new_target.assigned_to_id = assing_u_id
          end
          if new_target.save!
            SyncLog.sync_project_log("***【#{target_type}】. create_success---------------")
            if re[:journals].present?
              create_journals(re[:journals], "Journal", new_target.id)
            end
            if re[:journal_details].present?
              re[:journal_details].each do |j|
                JournalDetail.create!(j.merge(journal_id: new_target.id)) if j.present?
              end
            end
            if re[:member_roles].present?
              re[:member_roles].each do |m|
                MemberRole.create!(m.merge(member_id: new_target.id)) if m.present?
              end
            end
          else
            SyncLog.sync_project_log("***【#{target_type}】. create_failed---------------")
          end
        end
      end
      SyncLog.sync_project_log("***111222. end_to_create_target---------------")
    rescue => e
      SyncLog.sync_project_log("=========***【#{target_type}】creat_had_erros:#{e}===================")
    end
    
  end

  def create_journals(target_jsons, target_type,issue_id)
    SyncLog.sync_log("***【#{target_type}】. begin_to_create_target---------------")
    return SyncLog.sync_log("*** no target_jsons") if target_jsons.blank?
    target_jsons.each_with_index do |re,index|
      SyncLog.sync_log("***user_login:#{re[:user_login]}----target_type:#{target_type}-----#{index+1}")
      if re[:target_params].present?
        u_id = User.select(:id, :login).where(login: re[:user_login]).pluck(:id).first
        re[:target_params].delete(:id)
        new_target = Journal.new(re[:target_params].merge(user_id: u_id))
        new_target.journalized_id = issue_id
        if new_target.save!
          if re[:journal_details].present?
            re[:journal_details].each do |j|
              JournalDetail.create!(j.merge(journal_id: new_target.id))
            end
          end
        end
      end
    end
    SyncLog.sync_log("***111222. end_to_create_journal---------------")
  end

  def create_versions(project, target_jsons)
    SyncLog.sync_log("***【Versions】. begin_to_create_verison---------------")
    return SyncLog.sync_log("*** no target_jsons") if target_jsons.blank?
    all_issues = project.issues.select(:id, :project_id, :fixed_version_id)
    target_jsons.each do |re|
      old_id = re[:target_params][:id]
      if re[:target_params].present?
        u_id = User.select(:id, :login).where(login: re[:user_login]).pluck(:id).first
        re[:target_params].delete(:id)
        new_target = Version.new(re[:target_params].merge(user_id: u_id))
        if new_target.save!
          all_issues&.where(fixed_version_id: old_id)&.update_all(fixed_version_id: new_target.id)
        end
      end
    end
    SyncLog.sync_log("***111222. end_to_create_target---------------")
  end

end