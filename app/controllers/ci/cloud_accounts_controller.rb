class Ci::CloudAccountsController < Ci::BaseController
  include Devopsable

  before_action :load_project, only: %i[create activate]
  before_action :ci_authorize!, only: %i[create activate]
  before_action :find_cloud_account, only: %i[activate]
  before_action :load_repo, only: %i[activate]

  def create
    ActiveRecord::Base.transaction do
      Ci::CreateCloudAccountForm.new(devops_params).validate!

      @cloud_account = bind_account(current_user)
      if @cloud_account.blank?
        render_error('激活失败, 请检查你的云服务器信息是否正确.')
        raise ActiveRecord::Rollback
      else
        current_user.set_drone_step!(User::DEVOPS_UNVERIFIED)
      end
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def activate
    return render_error('请先在指定地址做用户认证') unless current_user.ci_certification?

    return render_error('该项目已经激活') if @repo && @repo.repo_active?

    ci_user = Ci::User.find_by(user_login: current_user.login)
    repo = Ci::Repo.where(repo_namespace: current_user.login, repo_name: params[:repo]).first
    begin
      repo.activate!(ci_user.user_id)
      @project.update_column(:open_devops, true)
      @cloud_account.update_column(:ci_user_id, ci_user.user_id)
      render_ok
    rescue Exception => ex
      render_error(ex.message)
    end
  end

  def show
    @cloud_account = current_user.ci_cloud_account
  end


  def bind
    Ci::CreateCloudAccountForm.new(devops_params).validate!

    ActiveRecord::Base.transaction do
      @cloud_account = bind_account(current_user)
      if @cloud_account.blank?
        render_error('激活失败, 请检查你的云服务器信息是否正确.')
        raise ActiveRecord::Rollback
      else
        current_user.set_drone_step!(User::DEVOPS_UNVERIFIED)
      end
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def unbind
    ActiveRecord::Base.transaction do
      unbind_account!(current_user)
      render_ok
    end
  rescue Exception => ex
    render_error(ex.message)
  end


  private
    def devops_params
      params.permit(:account, :secret, :ip_num)
    end

    def find_cloud_account
      @cloud_account = Ci::CloudAccount.find params[:id]
    end

    def bind_account(user)
      # 1. 保存华为云服务器帐号
      create_params = devops_params.merge(ip_num: IPAddr.new(devops_params[:ip_num]).to_i, secret: Ci::CloudAccount.encrypted_secret(devops_params[:secret]))

      return render_error('你已绑定了云帐号.') if user.ci_cloud_account.blank?

      cloud_account = Ci::CloudAccount.new(create_params)
      cloud_account.user = user
      cloud_account.save!

      # 2. 生成oauth2应用程序的client_id和client_secrete
      gitea_oauth = Gitea::Oauth2::CreateService.call(user.gitea_token, {name: "pipeline", redirect_uris: ["#{cloud_account.drone_url}/login"]})
      logger.info "######### gitea_oauth: #{gitea_oauth}"
      oauth = Oauth.new(client_id: gitea_oauth['client_id'],
        client_secret: gitea_oauth['client_secret'],
        redirect_uri: gitea_oauth['redirect_uris'],
        gitea_oauth_id: gitea_oauth['id'],
        user_id: current_user.id)
      oauth.save

      rpc_secret = SecureRandom.hex 16
      logger.info "######### rpc_secret: #{rpc_secret}"

      # 3. 创建drone server
      drone_server_cmd = Ci::Drone::Server.new(oauth.client_id, oauth.client_secret, cloud_account.drone_host, rpc_secret).generate_cmd
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

    def unbind_account!(user)
      cloud_account = user.ci_cloud_account
      case user.devops_step
      when User::DEVOPS_UNINIT, cloud_account.blank?
        return render_error('你未绑定CI服务器')
      when User::DEVOPS_UNVERIFIED
        cloud_account.destroy!
      when User::DEVOPS_CERTIFICATION
        cloud_account.ci_user.destroy!
      end
      user.projects.update_all(open_devops: false)
      user.set_drone_step!(User::DEVOPS_UNINIT)

      # TODO
      # 删除用户项目下的与ci相关的所有webhook
      user.projects.each do |project|
        result = Gitea::Hooks::ListService.call(user.gitea_token, user.login, project.identifier)

        if result.status == 200
          hooks = JSON.parse(result.body)
          hooks.each do |hook|
            if hook['config']['url'].include? cloud_account.drone_host
              Gitea::Hooks::DestroyService.call(user.gitea_token, user.login, project.identifier, hook['id'])
            end
          end
        end
      end
    end
end
