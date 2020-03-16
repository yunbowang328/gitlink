class SyncForgeJob < ApplicationJob
  queue_as :default

  def perform(sync_params)

    Rails.logger.info("#######______sync__start__########")
    sync_params = ActiveSupport::JSON.decode(sync_params)

    all_target_params = sync_params["target_params"]
    roles_params = sync_params["roles"]
    user_params = sync_params["user_params"]["user_params"]
    owner_extension_params = sync_params["user_params"]["user_extension_params"]
    platform = sync_params["platform"]

    if user_params.present?
      new_user = sync_user(user_params, owner_extension_params,platform)
      if new_user.present?
        ActiveRecord::Base.transaction do
          begin
            user_params = user_params["user"] if old_version_source.include?(platform)
            Watcher&.where(user_id: user_params["id"]).update_all(user_id: new_user.id)
            ProjectTrend&.where(user_id: user_params["id"]).update_all(user_id: new_user.id)
            sync_roles(roles_params, platform)
            if all_target_params.present?
              all_target_params.each do |project|
                target_params = {
                  project_params: project["project_params"],
                  member_params: project["member_params"],
                  issue_params: project["issue_params"],
                  versions_params: project["versions_params"],
                  project_score_params: project["project_score_params"],
                  pull_request_params: project["pull_request_params"],
                  repo_params: project["repo_params"],
                  commit_params: project["commit_params"],
                  watchers_params: project["watchers_params"],
                  praise_trends_params: project["praise_trends_params"]
                }
                sync_projects(new_user, user_params["id"],target_params, platform)
              end
            end
          rescue Exception => e
            Rails.logger.info("#######_________user__sync__failed__#########{e}")
            raise ActiveRecord::Rollback
          end
        end
      else
        Rails.logger.info("############___________________########{user_params["login"]}创建失败")
      end
    end
  end

  def old_version_source
    %w(trustie)
  end

  private

  def sync_user(owner_params,owner_extension_params,platform)
    ActiveRecord::Base.transaction do
      begin
        Rails.logger.info("#######______sync_user_start__########")
        keys_other_delete = %w(id created_at updated_at user_id)
        keys_to_delete = %w(id created_on updated_on platform)
        owner_params = owner_params["user"] if old_version_source.include?(platform)   #trustie上需要

        owner_params = owner_params&.except!(*keys_to_delete)
        user_password = random_password
        new_user = []
        if owner_params.present?
          if User.exists?(login: owner_params["login"])
            new_user = User.find_by(login: owner_params["login"])
          elsif  User.exists?(mail: owner_params["mail"])
            new_user = User.find_by(mail: owner_params["mail"])
          else
            new_user = User.new(owner_params.merge(platform: platform))
            new_user.save(:validate => false)

            interactor = Gitea::RegisterInteractor.call({username: owner_params["login"], email: owner_params["mail"], password: user_password})

            if interactor.success?
              gitea_user = interactor.result
              gitea_uid =  gitea_user['id']
              # new_user.gitea_uid = gitea_user['id']
            else
              response = Gitea::User::GetTokenService.new("#{owner_params["login"]}").call
              if response.status == 200
                gitea_uid = JSON.parse(response.body)["id"]
                # new_user.gitea_uid = user_id
              else
                gitea_uid =  ""
              end
            end
            result = Gitea::User::GenerateTokenService.new(owner_params["login"], user_password).call
            if result != 401
              gitea_token = result.result['sha1']
              # new_user.gitea_token = result.result['sha1']
            else
              gitea_token = ""
            end
            new_user.update_attributes(gitea_uid: gitea_uid, gitea_token: gitea_token)

            if owner_extension_params.present?
              owner_extension_params = owner_extension_params["user_extensions"] if old_version_source.include?(platform)  #trustie上需要
              owner_extension_params = owner_extension_params&.except!(*keys_other_delete).merge(user_id: new_user.id)
              UserExtension.create!(owner_extension_params)
            end
          end
          Rails.logger.info("#######______sync_user_end__########")
        end

        new_user

      rescue Exception => e
        failed_dic = "public/sync_failed_users.dic"
        File.open(failed_dic,"a") do |file|
          file.puts "user_info---#{owner_params},errors--#{e}"
        end
      end
    end

  end

  def random_password
    [*('a'..'z'),*(0..9),*('A'..'Z')].shuffle[0..8].join
  end

  #同步项目
  def sync_projects(new_user,old_user_id, targets,platform)
    Rails.logger.info("#######__projects_sync__start__########")
    keys_to_delete = %w(id created_on updated_on user_id language)
    score_to_delete = %w(id created_at updated_at project_id)
    begin
      if targets.present?
        project = targets[:project_params]
        issue_params = targets[:issue_params]
        pr_params = targets[:pull_request_params]
        commit_params = targets[:commit_params]
        version_params = targets[:versions_params]
        member_params = targets[:member_params]
        project_score = targets[:project_score_params]
        repo_params = targets[:repo_params]
        praise_trends_params = targets[:praise_trends_params]
        watchers_params = targets[:watchers_params]

        if project.present?
          project = project["project"] if old_version_source.include?(platform)

          project_identifier = project["identifier"]
          if repo_params.present?
            project_identifier = repo_params["identifier"]
          end

          new_project = Project.new(project&.except!(*keys_to_delete).merge(user_id: new_user.id))
          if new_project.save!(:validate => false)
            if project_identifier.present?
              repository_params = {
                hidden: project["is_public"],
                user_id: new_user.id,
                identifier: project_identifier
              }
              Repositories::CreateService.new(new_user, new_project, repository_params).call
            end

            if project_score.present?
              project_score = project_score["project_score"] if old_version_source.include?(platform) #trustie上需要
              ProjectScore.create!(project_score&.except!(*score_to_delete).merge(project_id: new_project.id))
            end

            sync_user_issues(new_project.id, new_user.id,old_user_id,issue_params, platform)
            sync_members(new_project.id, member_params,platform)
            sync_commits(new_project.id,new_project.gpid, commit_params,platform)
            sync_pull_requests(new_project.id,new_user.id, pr_params,platform)
            sync_versions(new_project.id, new_user.id, version_params,platform)
            sync_watchers(new_project.id, watchers_params, platform)
            sync_praises(new_project.id,praise_trends_params,platform)
          end
        end
      end
    rescue Exception => e
      Rails.logger.info("#######_______projects_sync__failed__#########{e}")
      raise ActiveRecord::Rollback
    end
  end

  def sync_watchers(project_id, watchers_params, platform)
    Rails.logger.info("#######______sync_watchers_start__#######")
    roles_other_delete = %w(id watchable_id)
    ActiveRecord::Base.transaction do
      begin

        if watchers_params.present?
          Watcher.transaction do
            watchers_params.each do |r|
              if r.present?
                r = r["watcher"] if old_version_source.include?(platform)
                new_wathcer = Watcher.new(r&.except!(*roles_other_delete).merge(watchable_id: project_id))
                new_wathcer.save(:validate => false)
              end
            end
          end
        end
        Rails.logger.info("#######______sync_watchers_end__#######")
      rescue Exception => e
        Rails.logger.info("#######_______sync_watchers__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end

  end

  def sync_praises(project_id, praises_params, platform)
    Rails.logger.info("#######______sync_praises_start__#######")
    roles_other_delete = %w(id praise_tread_object_id created_at updated_at)
    ActiveRecord::Base.transaction do
      begin

        if praises_params.present?
          PraiseTread.transaction do
            praises_params.each do |r|
              if r.present?
                r = r["praise_tread"] if old_version_source.include?(platform)  #trustie上需要
                new_tread = PraiseTread.new(r&.except!(*roles_other_delete).merge(praise_tread_object_id: project_id))
                new_tread.save(:validate => false)
              end
            end
          end
        end
        Rails.logger.info("#######______sync_praises_end__#######")
      rescue Exception => e
        Rails.logger.info("#######_______sync_praises__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end

  end

  def sync_roles(roles,platform)
    Rails.logger.info("#######______sync_roles_start__#######")
    roles_other_delete = %w(id)
    ActiveRecord::Base.transaction do
      begin

        if roles.present?
          Role.transaction do
            roles.each do |r|
              if r.present?
                r = r["role"] if old_version_source.include?(platform)  #trustie上需要
                unless Role.exists?(name: r["name"])
                  Role.create!(r&.except!(*roles_other_delete))
                end
              end
            end
          end
        end
        Rails.logger.info("#######______sync_roles_end__#######")

      rescue Exception => e
        Rails.logger.info("#######_______sync_roles__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end

  end

  def sync_members(project_id,members_params,platform)
    Rails.logger.info("#######______sync_members_start__#######")
    member_to_delete = %w(id created_on user_id project_id)
    ActiveRecord::Base.transaction do
      begin
        if members_params.present?
          members_params.each do |m|
            member = m["member"]
            member_user = m["member_user"]
            member_user_exten = m["member_extension"]
            member_roles = m["member_roles"]
            member_issues = m["member_issues"]
            if member_user.present?
              u = sync_user(member_user,member_user_exten, platform)
              if u.present? && member.present?
                member = member["member"] if old_version_source.include?(platform) #trustie上需要
                unless Member.exists?(user_id: u.id, project_id: project_id)
                  new_member = Member.new(member&.except!(*member_to_delete).merge(project_id: project_id, user_id: u.id))
                  if new_member.save!(:validate => false)
                    sync_user_issues(project_id, u.id, member["user_id"],member_issues, platform)
                    sync_member_roles(new_member.id, member_roles,platform)
                  end
                end
              end
            end
          end
        end
        Rails.logger.info("#######______sync_members_end__#######")

      rescue Exception => e
        Rails.logger.info("#######_______sync_members__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end
  end

  def sync_member_roles(member_id,members,platform)
    Rails.logger.info("#######______sync_members___roles_start__#######")
    member_role_delete = %w(id member_id role_id)
    begin
      if members.present?
        MemberRole.transaction do
          members.each do |m|
            if m.present?
              m = m["member_role"] if old_version_source.include?(platform) #trustie上需要
              role_id = Role.select(:id,:position)&.where(position: m["role_id"])&.first&.id
              MemberRole.create!(m&.except!(*member_role_delete).merge(member_id: member_id, role_id: role_id)) if m.present?
            end
          end
        end
      end
      Rails.logger.info("#######______sync_members___roles_end__#######")
    rescue => e
      Rails.logger.info("#######_______sync_members___roles__failed__#########{e}")
      raise ActiveRecord::Rollback
    end
  end

  #同步该用户的issues
  def sync_user_issues(project_id, new_user_id,old_user_id,issues_all_params,platform)
    Rails.logger.info("#######______sync_issues_start__#########")
    issue_to_delete = %w(id project_id author_id created_on updated_on assigned_to_id)
    ActiveRecord::Base.transaction do
      begin
        if issues_all_params.present?
          issues_all_params.each do |is_params|
            issue_params = is_params["issue_params"]
            jours_params = is_params["jours_params"]
            commit_params = is_params["commit_params"]
            Issue.select(:id, :assigned_to_id).where(assigned_to_id: old_user_id)&.update_all(assigned_to_id: new_user_id)

            if issue_params.present?
              issue_params = issue_params["issue"] if old_version_source.include?(platform) #trustie上需要
              assgin_user = issue_params["assigned_to_id"]
              if issue_params["assigned_to_id"].to_i == old_user_id
                assgin_user = new_user_id
              end
              issue = Issue.new(issue_params&.except!(*issue_to_delete).merge(project_id: project_id, author_id: new_user_id, assigned_to_id: assgin_user))
              if issue.save!(:validate => false)
                sync_journals(new_user_id, issue.id, jours_params, platform)
                sync_commit_issues(issue.id,project_id, commit_params, platform)
              else
                Rails.logger.info("############______.errors.full_messages_____________##########{issue.errors.full_messages}")
              end
            end
            Rails.logger.info("#######______sync_issues_end_######")
          end
        end
      rescue Exception => e
        Rails.logger.info("#######______sync_issues__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end

  end

  def sync_journals(user_id, issue_id, jours_params,platform)
    Rails.logger.info("#######______sync_journals_start__########")

    jour_to_delete = %w(id created_on journalized_id)
    ActiveRecord::Base.transaction do
      begin
        if jours_params.present?
          Journal.transaction do
            jours_params.each do |i|
              if i.present?
                i = i["journal"] if old_version_source.include?(platform) #trustie上需要
                Journal.create!(i&.except!(*jour_to_delete).merge(journalized_id: issue_id, user_id: user_id))
              end

            end
          end
        end
        Rails.logger.info("#######______sync_journals_end__########")

      rescue Exception => e
        Rails.logger.info("#######________sync_journals__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end
  end

  def sync_commit_issues(issue_id, project_id, commit_params,platform)
    Rails.logger.info("#######______sync_commit_issues_start__########")

    commit_to_delete = %w(id created_at updated_at)
    ActiveRecord::Base.transaction do
      begin
        if commit_params.present?
          CommitIssue.transaction do
            commit_params.each do |i|
              if i.present?
                i = i["commit_issues"] if old_version_source.include?(platform) #trustie上需要
                CommitIssue.create!(i&.except!(*commit_to_delete).merge(issue_id: issue_id, project_id: project_id))
              end

            end
          end
        end
        Rails.logger.info("#######______sync_commit_issues_end__########")

      rescue Exception => e
        Rails.logger.info("#######________sync_commit_issues__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end
  end

  def sync_pull_requests(project_id, user_id, pull_params,platform)
    Rails.logger.info("#######______sync_project_pull_requests_start__########")

    commit_to_delete = %w(id user_id project_id created_at updated_at jenkins_output)
    ActiveRecord::Base.transaction do
      begin
        if pull_params.present?
          PullRequest.transaction do
            pull_params.each do |i|
              if i.present?
                i = i["pull_request"] if old_version_source.include?(platform) #trustie上需要
                PullRequest.create!(i&.except!(*commit_to_delete).merge(user_id: user_id, project_id: project_id))
              end

            end
          end
        end
        Rails.logger.info("#######______sync_project_pull_requests__end__########")
      rescue Exception => e
        Rails.logger.info("#######_______sync_project_pull_requests__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end
  end

  def sync_commits(project_id, repository_id, commit_params,platform)
    Rails.logger.info("#######______sync_project_commits_start__########")

    commit_to_delete = %w(id created_at updated_at)
    ActiveRecord::Base.transaction do
      begin
        if commit_params.present?
          Commit.transaction do
            commit_params.each do |i|
              if i.present?
                i = i["commit"] if old_version_source.include?(platform) #trustie上需要
                Commit.create!(i&.except!(*commit_to_delete).merge(repository_id: repository_id, project_id: project_id))
              end

            end
          end
        end
        Rails.logger.info("#######______sync_project_commits_end__########")
      rescue Exception => e
        Rails.logger.info("#######_______sync_project_commits__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end
  end

  def sync_versions(project_id, new_user_id,version_params,platform)
    Rails.logger.info("#######______sync_project_versions_start__########")

    version_to_delete = %w(id created_on updated_on project_id user_id)
    ActiveRecord::Base.transaction do
      begin
        if version_params.present?
          Version.transaction do
            version_params.each do |i|
              if i.present?
                i = i["version"] if old_version_source.include?(platform) #trustie上需要
                Version.create!(i&.except!(*version_to_delete).merge(user_id: new_user_id, project_id: project_id))
              end
            end
          end
        end
        Rails.logger.info("#######______sync_project_versions_end__########")
      rescue Exception => e
        Rails.logger.info("#######______sync_project_versions__failed__#########{e}")
        raise ActiveRecord::Rollback
      end
    end

  end

end