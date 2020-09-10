class Ci::CloudAccountsController < Ci::BaseController
  include Ci::CloudAccountManageable

  before_action :load_project, only: %i[create activate]
  before_action :authorize_owner_project!, only: %i[create activate]
  before_action :load_repo, only: %i[activate]
  before_action :find_cloud_account, only: %i[show]
  before_action :validate_params!, only: %i[create bind]

  def create
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
    return render_error('请先在指定地址做用户认证') unless @user.ci_certification?

    return render_error('该项目已经激活') if @repo && @repo.repo_active?
    begin
      @cloud_account = Ci::CloudAccount.find params[:id]
      ActiveRecord::Base.transaction do
        if @repo
          return render_error('该项目已经激活') if @repo.repo_active?
          @repo.activate!(@user.user_id)
        else
          @repo = Ci::Repo.auto_create!(@uesr, @project)
          @user.update_column(:user_syncing, false)
        end

        result = bind_hook!(@user, @cloud_account, @repo)
        @project.update_columns(open_devops: true, gitea_webhook_id: result['id'])
        @cloud_account.update_column(:ci_user_id, @user.user_id)
      end
      render_ok
    rescue Exception => ex
      render_error(ex.message)
    end
  end

  def show
  end

  def bind
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

  def unbind
    ActiveRecord::Base.transaction do
      unbind_account!
      render_ok
    end
  rescue Exception => ex
    render_error(ex.message)
  end


  private
    def validate_params!
      Ci::CreateCloudAccountForm.new(devops_params).validate!
    end
end
