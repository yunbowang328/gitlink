class Admins::EduSettingsController < Admins::BaseController
  before_action :find_setting, only: [:edit,:update, :destroy]

  def index
    default_sort('id', 'desc')

    edu_settings = Admins::EduSettingQuery.call(params)
    @edu_settings = paginate edu_settings
  end
  
  def new
    @edu_setting = EduSetting.new
  end

  def edit 
  end

  def create
    @edu_setting = EduSetting.new(edu_setting_params)
    if @edu_setting.save
      redirect_to admins_edu_settings_path
      flash[:success] = '创建成功'
    else
      redirect_to admins_edu_settings_path
      flash[:danger] = @edu_setting.errors.full_messages.join(",")
    end
  end
  
  def update
    if @edu_setting.update!(edu_setting_params)
      flash[:success] = '更新成功'
    else
      flash[:danger] = @edu_setting.errors.full_messages.join(",")
    end
    redirect_to admins_edu_settings_path
  end
  
  def destroy
    if @edu_setting.destroy!
      flash[:success] = '删除成功'
    else
      lash[:danger] = '删除失败'
    end
    redirect_to admins_edu_settings_path
  end
  
  private
  def find_setting
    @edu_setting ||= EduSetting.find(params[:id])
  end
  
  def edu_setting_params
    params.require(:edu_setting).permit(:name, :value, :description)
  end
end
