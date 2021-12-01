class Admins::Topic::BannersController < Admins::Topic::BaseController
  before_action :find_banner, only: [:edit, :update, :destroy]

  def index 
    @banners = paginate(::Topic::Banner)
  end

  def new 
    @banner = ::Topic::Banner.new
  end

  def create 
    @banner = ::Topic::Banner.new(banner_params)
    if @banner.save 
      save_image_file(params[:image], @banner)
      redirect_to admins_topic_banners_path
      flash[:success] = "新增banner成功"
    else
      redirect_to admins_topic_banners_path
      flash[:danger] = "新增banner失败"
    end
  end

  def edit 
  end

  def update 
    @banner.attributes = banner_params
    if @banner.save 
      save_image_file(params[:image], @banner)
      redirect_to admins_topic_banners_path
      flash[:success] = "更新banner成功"
    else  
      redirect_to admins_topic_banners_path
      flash[:danger] = "更新banner失败"
    end
  end

  def destroy 
    if @banner.destroy 
      redirect_to admins_topic_banners_path
      flash[:success] = "删除banner成功"
    else  
      redirect_to admins_topic_banners_path
      flash[:danger] = "删除banner失败"
    end
  end

  private 
  def find_banner
    @banner = ::Topic::Banner.find_by_id(params[:id])
  end

  def banner_params 
    params.require(:topic_banner).permit(:title, :order_index)
  end
end