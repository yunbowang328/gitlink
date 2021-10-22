class Admins::SitesController < Admins::BaseController 
  before_action :find_site, only: [:edit,:update, :destroy]

  def index
    default_sort('id', 'desc')

    sites = Admins::SiteQuery.call(params)
    @sites = paginate sites
  end
  
  def new
    @site = Site.new
  end

  def edit 
  end

  def create
    @site = Site.new(site_params)
    if @site.save
      redirect_to admins_sites_path
      flash[:success] = '创建成功'
    else
      redirect_to admins_sites_path
      flash[:danger] = @site.errors.full_messages.join(",")
    end
  end
  
  def update
    if @site.update!(site_params)
      flash[:success] = '更新成功'
    else
      flash[:danger] = @site.errors.full_messages.join(",")
    end
    redirect_to admins_sites_path
  end
  
  def destroy
    if @site.destroy!
      flash[:success] = '删除成功'
    else
      lash[:danger] = '删除失败'
    end
    redirect_to admins_sites_path
  end
  
  private
  def find_site
    @site ||= Site.find(params[:id])
  end
  
  def site_params
    params.require(:site).permit(:name, :url, :key, :site_type)
  end

end
