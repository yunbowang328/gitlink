class CheckGiteaUser
  # 运行示例: 检查哪些用户的gitea不存在，bundle exec rails runner "CheckGiteaUser.new.call()"
  
    def call
      SyncLog.sync_log("=====begin to check gitea_user======")

      all_users = User.select(:id, :gitea_token, :gitea_uid, :mail, :type).where(type: "User", gitea_token: [nil, ""], gitea_uid: [nil, ""])
      if all_users.present?
        new_password = "12345678"
        all_users.each do |user|
          SyncLog.sync_log("=====check_user_login_is:#{user.login}======")
          ActiveRecord::Base.transaction do
            interactor = Gitea::RegisterInteractor.call({username: user.login, email: user&.mail.present? ? user.mail : "#{user.login}@example.com", password: new_password})
            if interactor.success?
              gitea_user = interactor.result
              result = Gitea::User::GenerateTokenService.new(user.login, new_password).call
              user.gitea_token = result['sha1']
              user.gitea_uid = gitea_user['id']
              if user.save!
                SyncLog.sync_log("=================create_gitea_user_success_login==#{user.login}")
              else
                SyncLog.sync_log("=================create_gitea_user_success_login==#{user.login}")
              end
            else
              SyncLog.sync_log("=============sync_to_user_failed,user_login====#{user.login}")
            end
          end
        rescue Exception => e
          SyncLog.sync_log("=================create_gitea_user_has_erros=#{user.login}===#{e}")
        end
      end
      SyncLog.sync_log("=====end_to_check_gitea_user=====")
    end
  end