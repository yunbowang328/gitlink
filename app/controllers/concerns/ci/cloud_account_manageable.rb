module Ci::CloudAccountManageable
  extend ActiveSupport::Concern

  included do
  end

  def bind_account!
    # 1. 保存华为云服务器帐号
    create_params = devops_params.merge(ip_num: IPAddr.new(devops_params[:ip_num]).to_i, secret: Ci::CloudAccount.encrypted_secret(devops_params[:secret]))

    return render_error('你已绑定了云帐号.') unless current_user.ci_cloud_account.blank?

    cloud_account = Ci::CloudAccount.new(create_params)
    cloud_account.user = current_user
    cloud_account.save!

    # 2. 生成oauth2应用程序的client_id和client_secrete
    gitea_oauth = Gitea::Oauth2::CreateService.call(current_user.gitea_token, {name: "pipeline", redirect_uris: ["#{cloud_account.drone_url}/login"]})
    logger.info "######### gitea_oauth: #{gitea_oauth}"
    oauth = Oauth.new(client_id: gitea_oauth['client_id'],
      client_secret: gitea_oauth['client_secret'],
      redirect_uri: gitea_oauth['redirect_uris'],
      gitea_oauth_id: gitea_oauth['id'],
      user_id: current_user.id)
    oauth.save!

    # 初始化ci端数据库
    ci_db_structure!(@connection, "#{current_user.login}_drone")

    rpc_secret = SecureRandom.hex 16
    logger.info "######### rpc_secret: #{rpc_secret}"

    # 3. 创建drone server
    drone_server_cmd = Ci::Drone::Server.new(current_user.login, oauth.client_id, oauth.client_secret, cloud_account.drone_host, rpc_secret).generate_cmd
    logger.info "######### drone_server_cmd: #{drone_server_cmd}"

    # 4. 创建drone client
    drone_client_cmd = Ci::Drone::Client.new(oauth.client_id, cloud_account.drone_ip, rpc_secret).generate_cmd
    logger.info "######### drone_client_cmd: #{drone_client_cmd}"

    # 5. 登录远程服务器，启动drone服务
    result = Ci::Drone::Start.new(cloud_account.account, cloud_account.visible_secret, cloud_account.drone_ip, drone_server_cmd, drone_client_cmd).run
    logger.info "######### result: #{result}"


    redirect_url = "#{cloud_account.drone_url}/login"
    logger.info "######### redirect_url: #{redirect_url}"

    result && !result.blank? ? cloud_account : nil
  end

  def unbind_account!
    cloud_account = current_user.ci_cloud_account
    ci_user = cloud_account.ci_user || Ci::User.find_by(user_login: current_user.login)

    if current_user.devops_step == User::DEVOPS_UNINIT || cloud_account.blank?
      return render_error('你未绑定CI服务器')
    elsif current_user.devops_step == User::DEVOPS_UNVERIFIED || current_user.ci_certification?
      ci_user.destroy!
      Ci::Repo.where(repo_namespace: current_user.login).delete_all
      cloud_account.destroy!
    end

    current_user.projects.update_all(open_devops: false)
    current_user.set_drone_step!(User::DEVOPS_UNINIT)

    # TODO
    # 删除用户项目下的与ci相关的所有webhook
    current_user.projects.select(:id, :identifier, :gitea_webhook_id).each do |project|
      if project.gitea_webhook_id
        result = Gitea::Hooks::DestroyService.call(current_user.gitea_token, current_user.login, project.identifier, project.gitea_webhook_id)
        project.update_column(:gitea_webhook_id, nil) if result.status == 204
      end
    end
  end

  def bind_hook!(user, cloud_account, repo)
    hook_params = {
      active: true,
      config: {
        content_type: "json",
        url: cloud_account.drone_url + "/hook?secret=#{repo.repo_signer}"
      },
      type: "gitea"
    }
    result = Gitea::Hooks::CreateService.call(user.gitea_token, user.login, repo.repo_name, hook_params)

    result[:status].present? ? nil : result
  end

  private
    def devops_params
      params.permit(:account, :secret, :ip_num)
    end

end
