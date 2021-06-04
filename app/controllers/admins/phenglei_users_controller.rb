class Admins::PhengleiUsersController < Admins::BaseController
  before_action :phenglei_project, only: [:index]

  def index 
    if params[:keyword].present?
      @phenglei_users = PhengleiUser.ransack(phone_cont: params[:keyword]).result
    else
      @phenglei_users = PhengleiUser 
    end
    @phenglei_users = @phenglei_users.page(page).per(per_page)
  end

  def new 
    @phenglei_user = PhengleiUser.new
  end

  def create 
    @phenglei_user = PhengleiUser.new(phenglei_user_params)
    if @phenglei_user.save 
      redirect_to admins_phenglei_users_path
      flash[:success] = "创建成功"
    else  
      redirect_to admins_phenglei_users_path 
      flash[:error] = "创建失败"
    end
  end

  private 
  def phenglei_project 
    @phenglei_project = Project.find_by_id(EduSetting.get("sync_phenglei_user_project"))
  end

  def phenglei_user_params
    params.require(:phenglei_user).permit(:phone)
  end
end
