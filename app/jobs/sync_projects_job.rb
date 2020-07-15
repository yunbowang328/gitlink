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
          SyncLog.sync_log("========== #{sync_params[:type]}============")
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
    create_target(re[:member_params], "Member") if re[:member_params].present?
    create_target(re[:watcher_params], "Watcher") if re[:watcher_params].present?
    create_target(re[:praise_treads], "PraiseTread") if re[:praise_treads].present?
    create_versions(project, re[:versions_params]) if re[:versions_params].present?
    create_target(re[:issues_params], "Issue") if re[:issues_params].present?
  end

  def create_target(target_jsons, target_type)
    begin
      SyncLog.sync_log("***【#{target_type}】. begin_to_create_target---------------")
      return SyncLog.sync_log("*** no target_jsons") if target_jsons.blank?
      target_jsons.each_with_index do |re,index|
        SyncLog.sync_log("***user_login:#{re[:user_login]}----target_type:#{target_type}-----#{index+1}")
        if re[:target_params].present?
          SyncLog.sync_log("***user_login:#{re[:user_login]}----target_type:#{target_type}")
          u_id = User.select(:id, :login).where(login: re[:user_login]).pluck(:id).first
          re[:target_params].delete(:id)
          if target_type == "Issue"
            is_exists = Issue.exists?(author_id: u_id, project_id: re[:target_params][:project_id], subject: re[:target_params][:subject])
            unless is_exists
              version_name = re[:target_params][:re_version]
              version_id = Version.where(project_id: re[:target_params][:project_id], name: version_name)&.first&.id if version_name.present?
              assing_u_id = User.select(:id, :login).where(login: re[:assign_login]).pluck(:id).first
              new_target = target_type.constantize.new(re[:target_params].merge(author_id: u_id))
              new_target.assigned_to_id = assing_u_id
              new_target.fixed_version_id = version_id if version_id.present?
            end
          else
            case target_type
            when "Journal"
              is_exists = Journal.exists?(user_id: u_id, journalized_id: re[:target_params][:journalized_id], created_on: re[:target_params][:created_on].to_s.to_time)
            when "Member"
              is_exists = Member.exists?(user_id: u_id, project_id: re[:target_params][:project_id], created_on: re[:target_params][:created_on].to_s.to_time)
            when "Version"
              is_exists = Version.exists?(user_id: u_id, project_id: re[:target_params][:project_id], created_on: re[:target_params][:created_on].to_s.to_time)
            when "Watcher"
              is_exists = Watcher.exists?(user_id: u_id, watchable_id: re[:target_params][:watchable_id], created_at: re[:target_params][:created_at].to_s.to_time)
            when "PraiseTread"
              is_exists = PraiseTread.exists?(user_id: u_id, praise_tread_object_id: re[:target_params][:praise_tread_object_id], created_at: re[:target_params][:created_at].to_s.to_time)
            else
              is_exists = false
            end
            unless is_exists
              new_target = target_type.constantize.new(re[:target_params].merge(user_id: u_id))
            end
          end

          if !is_exists && new_target.save!
            SyncLog.sync_log("***【#{target_type}】. create_success---------------")
            if re[:journals].present?
              create_journals(re[:journals], "Journal", new_target.id)
            end
            if re[:journal_details].present?
              re[:journal_details].each do |j|
                unless JournalDetail.exists?(journal_id: new_target.id)
                  JournalDetail.create!(j.merge(journal_id: new_target.id)) if j.present?
                end
              end
            end
            if re[:member_roles].present?
              re[:member_roles].each do |m|
                MemberRole.create!(m.merge(member_id: new_target.id)) if m.present?
              end
            end
          else
            SyncLog.sync_log("***【#{target_type}】. create_failed---or has_exists---------------")
          end
        end
      end
      SyncLog.sync_log("***111222. end_to_create_target---------------")
    rescue => e
      SyncLog.sync_log("=========***【#{target_type}】creat_had_erros:#{e}===================")
    end
    
  end

  def create_journals(target_jsons, target_type,issue_id)
    SyncLog.sync_log("***【#{target_type}】. begin_to_create_target---------------")
    return SyncLog.sync_log("*** no target_jsons") if target_jsons.blank?
    target_jsons.each_with_index do |re,index|
      SyncLog.sync_log("***user_login:#{re[:user_login]}----target_type:#{target_type}-----#{index+1}")
      if re[:target_params].present?
        u_id = User.select(:id, :login).where(login: re[:user_login]).pluck(:id).first
        is_exists = Journal.exists?(user_id: u_id, journalized_id: re[:target_params][:journalized_id], created_on: re[:target_params][:created_on].to_s.to_time)

        if is_exists
          SyncLog.sync_log("***00000. Journal:#{re[:target_params][:id]}-is exists--------------")
        else
          re[:target_params].delete(:id)
          new_target = Journal.new(re[:target_params].merge(user_id: u_id))
          new_target.journalized_id = issue_id
          if new_target.save!
            if re[:journal_details].present?
              re[:journal_details].each do |j|
                JournalDetail.create!(j.merge(journal_id: new_target.id))
              end
            end
          else
            SyncLog.sync_log("***111222. journal_create failed---------------")
          end
        end
      end
    end
    SyncLog.sync_log("***111222. end_to_create_journal---------------")
  end

  def create_versions(project, target_jsons)
    SyncLog.sync_log("***【Versions】. begin_to_create_verison---------------")
    return SyncLog.sync_log("*** no target_jsons") if target_jsons.blank?
    target_jsons.each do |re|
      old_id = re[:target_params][:id]
      if re[:target_params].present?
        u_id = User.select(:id, :login).where(login: re[:user_login]).pluck(:id).first
        is_exists = Version.exists?(user_id: u_id, project_id: re[:target_params][:project_id], created_on: re[:target_params][:created_on].to_s.to_time)
        if is_exists
          SyncLog.sync_log("***00000. Version:#{re[:target_params][:id]}-is exists--------------")
        else
          re[:target_params].delete(:id)
          new_target = Version.new(re[:target_params].merge(user_id: u_id))
          if new_target.save!
            SyncLog.sync_log("***111222. Version_create success-#{new_target.id}--------------")
            # all_issues = project.issues.select(:id, :project_id, :fixed_version_id)
            # all_issues&.where(fixed_version_id: old_id)&.update_all(fixed_version_id: new_target.id)
          else
            SyncLog.sync_log("***111222. Version_create failed-#{old_id}--------------")
          end
        end
      end
    end
    SyncLog.sync_log("***111222. end_to_create_target---------------")
  end

end