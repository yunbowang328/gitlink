class Ci::CloudAccountsController < Ci::BaseController
  include Ci::CloudAccountManageable

  skip_before_action :connect_to_ci_db, only: %i[create bind trustie_bind]
  before_action :load_project, only: %i[create activate]
  before_action :authorize_owner!, only: %i[create activate]
  before_action :load_repo, only: %i[activate]
  before_action :load_all_repo, only: %i[unbind]
  before_action :find_cloud_account, only: %i[show oauth_grant]
  before_action :validate_params!, only: %i[create bind]
  before_action only: %i[create bind] do
    connect_to_ci_database(master_db: true)
  end

  def create
    flag, msg = check_bind_cloud_account!
    return render_error(msg) if flag === true

    ActiveRecord::Base.transaction do
      @cloud_account = bind_account!
      if @cloud_account.blank?
        render_error('激活失败, 请检查你的云服务器信息是否正确.')
        raise ActiveRecord::Rollback
      else
        current_user.set_drone_step!(User::DEVOPS_UNVERIFIED)
        render_ok(redirect_url: @cloud_account.authenticate_url)
      end
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def activate
    return render_error('请先认证') unless current_user.ci_certification?

    begin
      @cloud_account = Ci::CloudAccount.find params[:id]
      ActiveRecord::Base.transaction do
        if @repo
          return render_error('该项目已经激活') if @repo.repo_active?
          @repo.activate!(@project)
        else
          @repo = Ci::Repo.auto_create!(@ci_user, @project)
          @user.update_column(:user_syncing, false)
        end

        result = bind_hook!(current_user, @cloud_account, @repo)
        @project.update_columns(open_devops: true, gitea_webhook_id: result['id'])
        @cloud_account.update_column(:ci_user_id, @ci_user.user_id)
      end
      render_ok
    rescue Exception => ex
      render_error(ex.message)
    end
  end

  def show
  end

  def bind
    flag, msg = check_bind_cloud_account!
    return render_error(msg) if flag === true

    ActiveRecord::Base.transaction do
      @cloud_account = bind_account!
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

  def trustie_bind
    account = params[:account].to_s
    return render_error("account不能为空.") if account.blank?

    flag, msg = check_trustie_bind_cloud_account!
    return render_error(msg) if flag === true

    ActiveRecord::Base.transaction do
      @cloud_account = trustie_bind_account!
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
      if current_user.ci_cloud_account.server_type == Ci::CloudAccount::SERVER_TYPE_TRUSTIE
        if @repos
          @repos.each do |repo|
            repo.deactivate!
          end
        end
      end
      unbind_account!
      render_ok
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def oauth_grant
    password = params[:password].to_s
    return render_error('你输入的密码不正确.') unless current_user.check_password?(password)

    oauth = current_user.oauths.last
    return render_error("服务器出小差了.") if oauth.blank?

    result = gitea_oauth_grant!(password, oauth)
    return render_error('授权失败.') unless result === true
    current_user.set_drone_step!(User::DEVOPS_CERTIFICATION)
  end

  private
    def validate_params!
      Ci::CreateCloudAccountForm.new(devops_params).validate!
    end
end
