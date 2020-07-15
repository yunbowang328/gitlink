class SyncForgeController < ApplicationController
  # before_action :check_token

  def create 
    ActiveRecord::Base.transaction do
      params.permit!
      sync_params = params[:sync_params]
      project_user = User.where(login: sync_params[:owner_login])&.first 
      #以前已同步的项目,那么肯定存在仓库
      SyncLog.sync_log("=================begin_to_sync_forge: project_identifier: #{sync_params[:identifier]}========")
      user_projects = Project.where(user_id: project_user.id)
      if  user_projects.where(id: sync_params[:id], identifier: sync_params[:identifier]).present?
        has_project = true
        project = user_projects.where(id: sync_params[:id], identifier: sync_params[:identifier])&.first
      elsif user_projects.where(id: sync_params[:id]).present?
        has_project = true
        project = user_projects.where(id: sync_params[:id])&.first
      elsif user_projects.where(identifier: sync_params[:identifier]).present?
        has_project = true
        project = user_projects.where(identifier: sync_params[:identifier])&.first
      else
        has_project = false
      end

      if has_project
        SyncLog.sync_log("=================begin_to_update_project========")
        check_sync_project(project, sync_params)
      else #新建项目
        SyncLog.sync_log("=================begin_to_create_new_project========")
        
        project_params = {
          repository_name: sync_params[:identifier],
          user_id: project_user.id,
          private: !sync_params[:is_public],
          name: sync_params[:name]
        }
        project = Projects::CreateService.new(project_user, project_params).call
        if project.present?
          if sync_params[:project_score].present?
            sync_params.permit!
            score_params = sync_params[:project_score].merge(project_id: project.id)
            new_project_score = ProjectScore.create(score_params)
            SyncLog.sync_log("=================new_project_score:#{new_project_score.try(:id)}========")
          end
              
          SyncRepositoryJob.perform_later(sync_params[:owner_login], sync_params[:identifier], sync_params[:repository], get_sudomain) if sync_params[:repository].present?
          check_new_project(project, sync_params)
        else
          SyncLog.sync_project_log("=============new_project_create_failed, trustie_project_id==:#{params[:sync_params][:id]}")
        end
      end
    end
  rescue Exception => e
    SyncLog.sync_project_log("=============sync_has_errors:==#{e.message}, project_id==:#{params[:sync_params][:id]}")
  end

  def sync_users
    params.permit!
    sync_params = params[:sync_params]
    users_params = sync_params[:users]

    users_params.each do |u|
      if User.exists?(login: u[:user_params][:login])
        SyncLog.sync_log("=================sync_to_user_been_exists====#{u[:user_params][:login]}")
      else
        # new_user = User.new(u[:user_params])

        if u[:user_params][:mail].blank?
          u_mail = "#{u[:user_params][:login]}@example.com"
        else
          u_mail = u[:user_params][:mail]
        end

        new_user = User.new(u[:user_params].merge(mail: u_mail))

        username = new_user.login
        password = "12345678"
        # if new_user.save!
        #   SyncLog.sync_log("=================sync_to_user_success==#{new_user.login}")
        # else
        #   SyncLog.sync_log("=================sync_to_user_failed,user_login==#{new_user.login}")
        # end
        ActiveRecord::Base.transaction do
          interactor = Gitea::RegisterInteractor.call({username: username, email: new_user.mail, password: password})
          if interactor.success?
            gitea_user = interactor.result
            result = Gitea::User::GenerateTokenService.new(username, password).call
            new_user.gitea_token = result['sha1']
            new_user.gitea_uid = gitea_user['id']
            if new_user.save!
              UserExtension.create!(u[:user_extensions][:user_extensions].merge(user_id: new_user.id)) if u[:user_extensions].present? && u[:user_extensions][:user_extensions].present?
            else
              SyncLog.sync_log("=================sync_to_user_failed,user_login==#{new_user.login}")
            end
          else
            SyncLog.sync_log("=============sync_to_user_failed,user_login====#{new_user.login}")
            SyncLog.sync_log("=================sync_to_user_failed,user_login====#{new_user.login}")
          end
        end
      end
    end
    # normal_status(1, "completed_sync")
  rescue Exception => e
     SyncLog.sync_log("=================sync_user_failed====#{e}")
  end

  private 

  def check_sync_project(project,sync_params)
    begin
      gitea_main = "https://www.trustie.net/"
      # if request.subdomain === 'testforgeplus'
      #   gitea_main = "https://ucloudtest.trustie.net/"
      # end

      SyncLog.sync_log("----begin_to_check_sync_project----project_id:#{project.id}---------------")
      change_project_score(project, sync_params[:project_score], sync_params[:repository]) if sync_params[:repository].present?  #更新project_score 
      change_project_issues(project, sync_params[:issues],project.id, gitea_main) 
      change_project_members(project, sync_params[:members],gitea_main)
      change_project_versions(project, sync_params[:project_versions],gitea_main)
      change_project_watchers(project, sync_params[:project_watchers],gitea_main)
      change_project_praises(project, sync_params[:praise_trends],gitea_main)
    rescue => e
      SyncLog.sync_log("=========check_sync_project_errors:#{e}===================")
    end
    
  end

  def check_new_project(project,sync_params)
    SyncLog.sync_log("***8. begin_to_sync_new_project---------------")
    sync_projects_params = {
        type: "Project",
        ids: sync_params[:id],
        token: get_token,
        sync_params: sync_params,
        new_project_id: project.id
      }

      gitea_main = "https://www.trustie.net/"
      # if request.subdomain === 'testforgeplus'
      #   gitea_main = "https://ucloudtest.trustie.net/"
      # end
      SyncProjectsJob.perform_later(sync_projects_params, gitea_main)
      SyncLog.sync_log("***8. end_to_sync_new_project---------------")
  end

  def change_project_praises(project, praises,gitea_main)
    SyncLog.sync_log("***6. begin_to_sync_parises---------------")
    forge_praises_ids = project&.praise_treads&.select(:id)&.pluck(:id)
    diff_target_ids = praises[:ids] - forge_praises_ids
    if diff_target_ids.size > 0
      sync_projects_params = {
        type: "PraiseTread",
        ids: diff_target_ids,
        token: get_token,
        parent_id: project.id
      }
      SyncProjectsJob.perform_later(sync_projects_params,gitea_main)
      
      SyncLog.sync_log("***6. end_to_sync_parises---------------")
    end
  end

  #检查repository和project_score
  def change_project_score(project, project_scores, repository_params)
    SyncLog.sync_log("***1. begin_to_sync_project_score---------------")
    begin
      pre_project_score = project.project_score
      if pre_project_score.present?
        change_num = 0
        project_scores.each do |k,v|
          unless pre_project_score.send("#{k}") == v
            change_num += 1
            pre_project_score[:"#{k}"] = v
          end
          if k == "changeset_num" && v.to_i > pre_project_score.changeset_num.to_i && repository_params[:url].present?
            SyncRepositoryJob.perform_later(project.owner.try(:login), project.identifier, repository_params, get_sudomain)
          end
        end
        pre_project_score.save! if change_num > 0   #如果 project_score有变化则更新
      else 
        ProjectScore.create!(project_scores.merge(project_id: project.id))
      end
      SyncLog.sync_log("***1. end_to_sync_project_score---------------")
    rescue Exception => e
      SyncLog.sync_log("=========change_project_score_errors:#{e}===================")
    end
  end

  def change_project_issues(project, old_issues_params,project_id, gitea_main)
    SyncLog.sync_log("***2. begin_to_syncissues---------------")
    begin
      forge_issue_ids = project&.issues&.select(:id)&.pluck(:id)
      sync_projects_params = {}
      SyncLog.sync_log("***2--01. forge_issue_ids-#{forge_issue_ids.size.to_i}--------------")
      if forge_issue_ids.size.to_i <= old_issues_params[:count].to_i
        diff_issue_ids = old_issues_params[:ids] - forge_issue_ids
        
        if diff_issue_ids.size == 0  #issue数量一样，判断评论是否有增减
          forge_journal_ids = Journal.select([:id, :journalized_id, :journalized_type]).where(journalized_id: forge_issue_ids).pluck(:id)
          diff_journal_ids = old_issues_params[:journals][:ids] - forge_journal_ids
          unless diff_journal_ids.size == 0
            sync_projects_params = {
              type: "Journal",
              ids: diff_journal_ids,
              token: get_token,
              parent_id: project_id
            }
            SyncLog.sync_log("***2--02. sync_projects_params-#{sync_projects_params}--------------")
            SyncProjectsJob.perform_later(sync_projects_params, gitea_main)
          end
        else
          if diff_issue_ids.size > 200
            new_diff_ids = diff_issue_ids.in_groups_of(200).map{|k| k.reject(&:blank?)}
            new_diff_ids.each_with_index do |diff, index|
              sync_projects_params = {
                type: "Issue",
                ids: diff,
                token: get_token,
                parent_id: project_id
              }
              SyncLog.sync_log("***2--030#{idnex+1}. sync_projects_params_groups-#{sync_projects_params}--------------")
              SyncProjectsJob.perform_later(sync_projects_params, gitea_main)
            end
          else
            sync_projects_params = {
              type: "Issue",
              ids: diff_issue_ids,
              token: get_token,
              parent_id: project_id
            }
          end
          SyncLog.sync_log("***2--03. sync_projects_params_groups-#{sync_projects_params}--------------")
          SyncProjectsJob.perform_later(sync_projects_params, gitea_main)
        end
      end
      
      # SyncProjectsJob.perform_later(sync_projects_params, gitea_main) if sync_projects_params.present?
      SyncLog.sync_log("***2. end_to_syncissues---------------")
    rescue Exception => e
      SyncLog.sync_log("=========change_project_issues_errors:#{e}===================")
    end
  end

  def change_project_watchers(project, watchers,gitea_main)
    SyncLog.sync_log("***5. begin_to_sync_watchers---------------")
    forge_watchers_ids = project&.watchers&.select(:id)&.pluck(:id)
    if forge_watchers_ids.size.to_i <= watchers[:count].to_i
      diff_target_ids = watchers[:ids] - forge_watchers_ids
      if diff_target_ids.size > 0
        sync_projects_params = {
          type: "Watcher",
          ids: diff_target_ids,
          token: get_token,
          parent_id: project.id
        }
        SyncProjectsJob.perform_later(sync_projects_params,gitea_main)
        
      end
    end
    SyncLog.sync_log("***5. begin_to_sync_watchers---------------")
  end

  def change_project_versions(project, versions,gitea_main)
    SyncLog.sync_log("***4. begin_to_sync_versions---------------")
    forge_version_ids = project&.versions&.select(:id)&.pluck(:id)
    if forge_version_ids.size <= versions[:count].to_i
      diff_version_ids = versions[:ids] - forge_version_ids
      if diff_version_ids.size > 0
        sync_projects_params = {
          type: "Version",
          ids: diff_version_ids,
          token: get_token,
          parent_id: project.id
        }
        SyncProjectsJob.perform_later(sync_projects_params,gitea_main)
    end
    
      SyncLog.sync_log("***4. end_to_sync_versions---------------")
    end
  end

  def change_project_members(project, members,gitea_main)
    SyncLog.sync_log("***3. begin_to_sync_members---------------")
    forge_member_ids = project&.members&.select(:id)&.pluck(:id)
    if forge_member_ids.size <= members[:count]
      diff_member_ids = members[:ids] - forge_member_ids
      if diff_member_ids.size > 0
        sync_projects_params = {
          type: "Member",
          ids: diff_member_ids,
          token: get_token,
          parent_id: project.id
        }
        SyncProjectsJob.perform_later(sync_projects_params,gitea_main)
    end
    
      SyncLog.sync_log("***3. end_to_sync_members---------------")
    end
  end

  # def check_token 
  #   sync_params = params[:sync_params]
  #   unless sync_params[:token] && sync_params[:token] == get_token
  #     render json: {message: "token_errors"}
  #   end
  # end

  def get_token
    "34c82f51e0b699d9d16d70fd6497c9b1e4821d6ea3e872558a6537a091076b8e"
  end

  def get_sudomain
    SyncLog.sync_log("=================request.subdomain:#{request.subdomain}========")
    gitea_main = "gitea.trustie.net"
    if request.subdomain === 'testforgeplus'
      gitea_main = "testgitea2.trustie.net"
    # elsif request.subdomain === 'forgeplus'
    #   gitea_main = "gitea.trustie.net"
    end
    return gitea_main
  end

end