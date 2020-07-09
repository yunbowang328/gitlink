class SyncForgeController < ApplicationController
  before_action :check_token

  def create 
    sync_params = params["sync_params"]
    Rails.logger.info("========sync_params=1==#{params["sync_params"]}====")
    Rails.logger.info("========sync_params=2==#{params[:sync_params]}====")

    sync_params = eval(sync_params)

    #以前已同步的项目,那么肯定存在仓库
    if Project.exists?(id: sync_params[:id], identifier: sync_params[:identifier])
      project = Project.find_by(id: sync_params[:id])
      check_sync_project(project, sync_params)
    else #新建项目
      
      project_user = User.where(login: sync_params[:owner_login]).first.id 
      project_params = {
        identifier: sync_params[:identifier],
        user_id: user_id,
        is_public: sync_params[:is_public]
      }
      project = Projects::CreateService.new(project_user, project_params).call
      if project.present?
        project.project_score.create!( sync_params[:project_score]) if sync_params[:project_score]
        SyncRepositoryJob.perform_later(project.repository, sync_params[:repository_params]) if sync_params[:repository_params]
        check_new_project(project, sync_params)
      end
    end
  end

  def sync_users
    params.permit!
    users_params = params[:sync_params]
    users_params.each do |u|
      if User.exists?(login: u[:user_params][:login])
        normal_status(-1, "user:#{u[:user_params][:login]} is present")
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
              normal_status(1, "created_succrss")
            end
          else
            normal_status(-1, "created_failed")
          end
        end
      end
    end
  rescue Exception => e
    normal_status(-1, e.message)
  end

  private 

  def check_sync_project(project,sync_params)
    if sync_params[:repository_params].present?  #仓库存在
      change_project_score(project, sync_params[:project_score], sync_params[:repository_params])  #更新project_score
    end
    change_project_issues(project, sync_params[:issues],project.id) 
    change_project_members(project, sync_params[:members])
    change_project_versions(project, sync_params[:project_versions])
    change_project_watchers(project, sync_params[:project_watchers])
    change_project_praises(project, sync_params[:praise_trends])
  end

  def check_new_project(project,sync_params)
    sync_projects_params = {
        type: "Project",
        ids: sync_params[:id],
        token: get_token,
        sync_params: sync_params,
        new_project_id: project.id
      }
      SyncProjectsJob.perform_later(sync_projects_params)
  end

  def change_project_praises(project, praises)
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
    end
  end

  #检查repository和project_score
  def change_project_score(project, project_scores, repository_params)
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
      # project.project_score.create!(project_scores)
    end
  end

  def change_project_issues(project, old_issues_params,project_id)
    forge_issue_ids = project&.issues&.select(:id)&.pluck(:id)
    forge_journal_ids = Journal.select([:id, :journalized_id, :journalized_type]).where(journalized_id: forge_issue_ids).pluck(:id)
    diff_issue_ids = old_issues_params[:issue_params][:ids] - forge_issue_ids
    sync_projects_params = {}
    if diff_issue_ids.size == 0  #issue数量一样，判断评论是否有增减
      diff_journal_ids = old_issues_params[:issue_params][:journals][:ids] - forge_journal_ids
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
  end

  def change_project_watchers(project, watchers)
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
    end
  end

  def change_project_versions(project, versions)
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
    end
  end

  def change_project_members(project, members)
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
    end
  end

  def check_token 
    sync_params = params[:sync_params][0]
    unless sync_params[:token] && sync_params[:token] == get_token
      render json: {message: "token_errors"}
    end
  end

  def get_token
    "34c82f51e0b699d9d16d70fd6497c9b1e4821d6ea3e872558a6537a091076b8e"
  end

end