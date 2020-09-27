module Ci::CloudAccountManageable
  extend ActiveSupport::Concern

  included do
  end

  def bind_account!
    # 1. 保存华为云服务器帐号
    create_params = devops_params.merge(ip_num: IPAddr.new(devops_params[:ip_num]).to_i, secret: Ci::CloudAccount.encrypted_secret(devops_params[:secret]))

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

    # 创建数据ci端数据库
    database_result = auto_create_database!(@connection, "#{current_user.login}_drone")
    logger.info "[CI::DbConnectable] auto_create_database's result: #{database_result}"

    # 初始化表结构
    sub_connection = connect_to_ci_database
    auto_create_table_structure!(sub_connection)

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

    return nil unless result.present?

    gitea_oauth_grant!(current_user.gitea_uid, oauth.gitea_oauth_id)
    return cloud_account
    # result && !result.blank? ? cloud_account : nil
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

    current_user.unbind_account!
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

  def check_bind_cloud_account!
    return [true, "你已经绑定了云帐号."] unless current_user.ci_cloud_account.blank?

    ip_num = IPAddr.new(devops_params[:ip_num]).to_i
    Ci::CloudAccount.exists?(ip_num: ip_num) ? [true, "#{devops_params[:ip_num]}服务器已被使用."] : [false, nil]
  end

  def gitea_oauth_grant!(gitea_uid, application_id)
    gitea_server_config = Rails.configuration.database_configuration[Rails.env]["gitea_server"]
    if gitea_server_config.blank?
      puts "[Gitea Server]: gitea database config missing"
      return
    else
      puts "[Gitea Server]: gitea db config is exists."
    end

    connection =  establish_connection gitea_server_config

    unix_time = Time.now.to_i
    sql = "INSERT INTO oauth2_grant ( user_id, application_id, counter, created_unix, updated_unix ) VALUES ( #{gitea_uid}, #{application_id}, 0, #{unix_time}, #{unix_time} );"

    connection.execute(sql)
  end

  private
    def devops_params
      params.permit(:account, :secret, :ip_num)
    end

end
