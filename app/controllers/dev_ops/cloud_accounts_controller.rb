class DevOps::CloudAccountsController < ApplicationController
  before_action :require_login
  before_action :find_project

  def create
    ActiveRecord::Base.transaction do
      DevOps::CreateCloudAccountForm.new(devops_params).validate!
      logger.info "######### devops_params: #{devops_params}"
      logger.info "######### ......: #{(IPAddr.new devops_params[:ip_num]).to_i}"
      logger.info "######### ......: #{DevOps::CloudAccount.encrypted_secret(devops_params[:secret])}"
      # 1. 保存华为云服务器帐号
      logger.info "######### ......ff:  #{devops_params.merge(ip_num: IPAddr.new(devops_params[:ip_num]).to_i, secret: DevOps::CloudAccount.encrypted_secret(devops_params[:secret]))}"
      create_params = devops_params.merge(ip_num: IPAddr.new(devops_params[:ip_num]).to_i, secret: DevOps::CloudAccount.encrypted_secret(devops_params[:secret]))
      logger.info "######### create_params: #{create_params}"
      cloud_account = DevOps::CloudAccount.new(create_params)
      cloud_account.user = current_user
      cloud_account.save
      # 2. 生成oauth2应用程序的client_id和client_secrete
      gitea_oauth = Gitea::Oauth2::CreateService.call(current_user.gitea_token, {name: "pipeline", redirect_uris: ["#{cloud_account.drone_url}/login"]})
      logger.info "######### gitea_oauth: #{gitea_oauth}"
      oauth = Oauth.new(client_id: gitea_oauth['client_id'],
        client_secret: gitea_oauth['client_secret'],
        redirect_uri: gitea_oauth['redirect_uris'],
        gitea_oauth_id: gitea_oauth['id'],
        user_id: current_user.id,
        project_id: devops_params[:project_id])
      oauth.save

      rpc_secret = SecureRandom.hex 16
      logger.info "######### rpc_secret: #{rpc_secret}"
      # 3. 创建drone server
      drone_server_cmd = DevOps::Drone::Server.new(oauth.client_id, oauth.client_secret, cloud_account.drone_host, rpc_secret).generate_cmd
      logger.info "######### drone_server_cmd: #{drone_server_cmd}"

      # 4. 创建drone client
      drone_client_cmd = DevOps::Drone::Client.new(oauth.client_id, cloud_account.drone_ip, rpc_secret).generate_cmd
      logger.info "######### drone_client_cmd: #{drone_client_cmd}"

      # 5. 登录远程服务器，启动drone服务
      result = DevOps::Drone::Start.new(cloud_account.account, cloud_account.visible_secret, cloud_account.drone_ip, drone_server_cmd, drone_client_cmd).run
      logger.info "######### result: #{result}"


      redirect_url = "#{Gitea.gitea_config[:domain]}/login/oauth/authorize?client_id=#{oauth.client_id}&redirect_uri=#{cloud_account.drone_url}/login&response_type=code"
      logger.info "######### redirect_url: #{redirect_url}"
      if result
        render_ok(redirect_url: redirect_url)
      else
        render_error('激活失败')
      end
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  private
    def devops_params
      params.permit(:account, :secret, :ip_num, :project_id)
    end

    def find_project
      @project = Project.find_by_id params[:project_id]
      render_not_found("未找到project_id为:#{params[:project_id]}相关的项目") if @project.blank?
    end
end
