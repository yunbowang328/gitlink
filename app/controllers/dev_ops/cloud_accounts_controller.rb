class DevOps::CloudAccountsController < ApplicationController
  include Devopsable

  before_action :require_login
  before_action :auto_load_project
  before_action :devops_authorize!
  before_action :find_cloud_account, only: %i[activate]

  def create
    ActiveRecord::Base.transaction do
      DevOps::CreateCloudAccountForm.new(devops_params).validate!

      # 1. 保存华为云服务器帐号
      create_params = devops_params.merge(ip_num: IPAddr.new(devops_params[:ip_num]).to_i, secret: DevOps::CloudAccount.encrypted_secret(devops_params[:secret]))
      if cloud_account = @project.dev_ops_cloud_account
        return render_error('该仓库已绑定了云帐号.')
      else
        cloud_account = DevOps::CloudAccount.new(create_params)
        cloud_account.user = current_user
        cloud_account.save!
      end

      # 2. 生成oauth2应用程序的client_id和client_secrete
      gitea_oauth = Gitea::Oauth2::CreateService.call(current_user.gitea_token, {name: "pipeline", redirect_uris: ["#{cloud_account.drone_url}/login"]})
      logger.info "######### gitea_oauth: #{gitea_oauth}"
      oauth = Oauth.new(client_id: gitea_oauth['client_id'],
        client_secret: gitea_oauth['client_secret'],
        redirect_uri: gitea_oauth['redirect_uris'],
        gitea_oauth_id: gitea_oauth['id'],
        user_id: current_user.id,
        project_id: @project.id)
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


      redirect_url = "#{cloud_account.drone_url}/login"
      logger.info "######### redirect_url: #{redirect_url}"

      if result && !result.blank?
        current_user.set_drone_step!(User::DEVOPS_UNVERIFIED)
        render_ok(redirect_url: redirect_url)
      else
        render_error('激活失败, 请检查你的云服务器信息是否正确.')
        raise ActiveRecord::Rollback
      end
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def activate
    result =
      if current_user.devops_has_token?
        # 已有drone_token的，直接激活项目
         DevOps::Drone::API.new(@cloud_account.drone_token, @cloud_account.drone_url, @project.owner.login, @project.identifier).activate
      else
        # 没有token，说明是第一次激活devops, 需要用户填写token值
        return render_error('请先在CI服务端做用户认证.') if !current_user.devops_verified?
        DevOps::Drone::API.new(params[:drone_token], @cloud_account.drone_url, @project.owner.login, @project.identifier).activate
      end

    if result
      set_drone_token!(current_user, @cloud_account, params[:drone_token])
      @project.update_column(:open_devops, true)
      render_ok
    else
      render_error("激活失败，请检查你的token值是否正确.")
    end
  end

  private
    def devops_params
      params.permit(:account, :secret, :ip_num, :project_id)
    end
end
