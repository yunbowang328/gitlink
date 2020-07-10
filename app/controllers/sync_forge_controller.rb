class SyncForgeController < ApplicationController
  before_action :check_token

  def create 
    ActiveRecord::Base.transaction do
      sync_params = params[:sync_params]
      #以前已同步的项目,那么肯定存在仓库
      if Project.exists?(id: sync_params[:id], identifier: sync_params[:identifier])
        Rails.logger.info("=================begin_to_update_project========")
        project = Project.find_by(id: sync_params[:id])
        Rails.logger.info("--------project_id:#{project.id}---------------")
        check_sync_project(project, sync_params)
      else #新建项目
        Rails.logger.info("=================begin_to_create_new_project========")
        project_user = User.where(login: sync_params[:owner_login]).first 
        project_params = {
          repository_name: sync_params[:identifier],
          user_id: project_user.id,
          private: !sync_params[:is_public],
          name: sync_params[:name]
        }
        project = Projects::CreateService.new(project_user, project_params).call
        Rails.logger.info("=================new_project_id:#{project.id}========")
        Rails.logger.info("=================new_repository_id:#{project&.repository&.id}========")
        if project.present?
          if sync_params[:project_score].present?
            score_params = sync_params[:project_score].merge(project_id: project.id)
            Rails.logger.info("=================new_score_params:#{score_params}========")
            new_project_score = ProjectScore.create!(score_params)
            Rails.logger.info("=================new_project_score:#{new_project_score}========")
          end
          SyncRepositoryJob.perform_later(project.repository, sync_params[:repository]) if sync_params[:repository].present?
          check_new_project(project, sync_params)
        end
      end
    end
  rescue Exception => e
    Rails.logger.info("=================has_errors:==#{e.message}")
  end

  def sync_users
    params.permit!
    sync_params = params[:sync_params]
    users_params = sync_params[:users]

    users_params.each do |u|
      if User.exists?(login: u[:user_params][:login])
        SyncLog.sync_log("=================sync_to_user_been_exists====#{u[:user_params][:login]}")
      else
        new_user = User.new(u[:user_params])
        username = new_user.login
        password = "12345678"
        ActiveRecord::Base.transaction do
          interactor = Gitea::RegisterInteractor.call({username: username, email: new_user.mail, password: password})
          if interactor.success?
            gitea_user = interactor.result
            result = Gitea::User::GenerateTokenService.new(username, password).call
            new_user.gitea_token = result['sha1']
            new_user.gitea_uid = gitea_user['id']
            if new_user.save!
              UserExtension.create!(u[:user_extensions].merge(user_id: new_user.id)) if u[:user_extensions].present?
              SyncLog.sync_log("=================sync_to_user_success====#{new_user.login}")
            else
              SyncLog.sync_log("=================sync_to_user_failed==1==#{new_user.login}")
            end
          else
            SyncLog.sync_log("=================sync_to_user_failed====#{new_user.login}")
          end
        end
      end
    end
    normal_status(1, "completed_sync")
  rescue Exception => e
    normal_status(-1, e.message)
  end

  private 

  def check_sync_project(project,sync_params)
    begin
      Rails.logger.info("----begin_to_check_sync_project----project_id:#{project.id}---------------")
      change_project_score(project, sync_params[:project_score], sync_params[:repository]) if sync_params[:repository].present?  #更新project_score 
      change_project_issues(project, sync_params[:issues],project.id) 
      change_project_members(project, sync_params[:members])
      change_project_versions(project, sync_params[:project_versions])
      change_project_watchers(project, sync_params[:project_watchers])
      change_project_praises(project, sync_params[:praise_trends])
    rescue => e
      Rails.logger.info("=========check_sync_project_errors:#{e}===================")
    end
    
  end

  def check_new_project(project,sync_params)
    Rails.logger.info("***8. begin_to_sync_new_project---------------")
    sync_projects_params = {
        type: "Project",
        ids: sync_params[:id],
        token: get_token,
        sync_params: sync_params,
        new_project_id: project.id
      }
      SyncProjectsJob.perform_later(sync_projects_params)
      Rails.logger.info("***8. end_to_sync_new_project---------------")
  end

  def change_project_praises(project, praises)
    Rails.logger.info("***6. begin_to_sync_parises---------------")
    forge_praises_ids = project&.praise_treads&.select(:id)&.pluck(:id)
    diff_target_ids = praises[:ids] - forge_praises_ids
    if diff_target_ids.size > 0
      sync_projects_params = {
        type: "PraiseTread",
        ids: diff_target_ids,
        token: get_token,
        parent_id: project.id
      }
      SyncProjectsJob.perform_later(sync_projects_params)
      
      Rails.logger.info("***6. end_to_sync_parises---------------")
    end
  end

  #检查repository和project_score
  def change_project_score(project, project_scores, repository_params)
    Rails.logger.info("***1. begin_to_sync_project_score---------------")
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
            SyncRepositoryJob.perform_later(project.repository, repository_params)
          end
        end
        pre_project_score.save! if change_num > 0   #如果 project_score有变化则更新
      else 
        ProjectScore.create!(project_scores.merge(project_id: project.id))
      end
      Rails.logger.info("***1. end_to_sync_project_score---------------")
    rescue Exception => e
      Rails.logger.info("=========change_project_score_errors:#{e}===================")
    end
  end

  def change_project_issues(project, old_issues_params,project_id)
    Rails.logger.info("***2. begin_to_syncissues---------------")
    begin
      forge_issue_ids = project&.issues&.select(:id)&.pluck(:id)
      forge_journal_ids = Journal.select([:id, :journalized_id, :journalized_type]).where(journalized_id: forge_issue_ids).pluck(:id)
      diff_issue_ids = old_issues_params[:ids] - forge_issue_ids
      sync_projects_params = {}
      if diff_issue_ids.size == 0  #issue数量一样，判断评论是否有增减
        diff_journal_ids = old_issues_params[:journals][:ids] - forge_journal_ids
        unless diff_journal_ids.size == 0
          sync_projects_params = {
            type: "Journal",
            ids: diff_journal_ids,
            token: get_token,
            parent_id: project_id
          }
        end
      else
        sync_projects_params = {
          type: "Issue",
          ids: diff_issue_ids,
          token: get_token,
          parent_id: project_id
        }
      end
      SyncProjectsJob.perform_later(sync_projects_params) if sync_projects_params.present?
      Rails.logger.info("***2. end_to_syncissues---------------")
    rescue Exception => e
      Rails.logger.info("=========change_project_issues_errors:#{e}===================")
    end
  end

  def change_project_watchers(project, watchers)
    Rails.logger.info("***5. begin_to_sync_watchers---------------")
    forge_watchers_ids = project&.watchers&.select(:id)&.pluck(:id)
    diff_target_ids = watchers[:ids] - forge_watchers_ids
    if diff_target_ids.size > 0
      sync_projects_params = {
        type: "Watcher",
        ids: diff_target_ids,
        token: get_token,
        parent_id: project.id
      }
      SyncProjectsJob.perform_later(sync_projects_params)
      Rails.logger.info("***5. begin_to_sync_watchers---------------")

    end
  end

  def change_project_versions(project, versions)
    Rails.logger.info("***4. begin_to_sync_versions---------------")
    forge_version_ids = project&.versions&.select(:id)&.pluck(:id)
    diff_version_ids = versions[:ids] - forge_version_ids
    if diff_version_ids.size > 0
      sync_projects_params = {
        type: "Version",
        ids: diff_version_ids,
        token: get_token,
        parent_id: project.id
      }
      SyncProjectsJob.perform_later(sync_projects_params)
      Rails.logger.info("***4. end_to_sync_versions---------------")
    end
  end

  def change_project_members(project, members)
    Rails.logger.info("***3. begin_to_sync_members---------------")
    forge_member_ids = project&.members&.select(:id)&.pluck(:id)
    diff_member_ids = members[:ids] - forge_member_ids
    if diff_member_ids.size > 0
      sync_projects_params = {
        type: "Member",
        ids: diff_member_ids,
        token: get_token,
        parent_id: project.id
      }
      SyncProjectsJob.perform_later(sync_projects_params)
      Rails.logger.info("***3. end_to_sync_members---------------")
    end
  end

  def check_token 
    sync_params = params[:sync_params]
    unless sync_params[:token] && sync_params[:token] == get_token
      render json: {message: "token_errors"}
    end
  end

  def get_token
    "34c82f51e0b699d9d16d70fd6497c9b1e4821d6ea3e872558a6537a091076b8e"
  end

end