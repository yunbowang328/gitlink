class Admins::ProjectLicensesController < Admins::BaseController 
  before_action :set_license, only: [:edit,:update, :destroy,:show]
  before_action :validate_params, only: [:create, :update]

  def index
    sort_by = params[:sort_by] ||= 'created_at'
    sort_direction = params[:sort_direction] ||= 'desc'
    q = License.ransack(name_cont: params[:search])
    project_licenses = q.result(distinct: true).order("#{sort_by} #{sort_direction}")
    @project_licenses = paginate(project_licenses)
  end

  def new
    @project_license = License.new
  end

  def show
  end

  def create
    # conditions = params[:license][:conditions_array].reject(&:blank?).join(",") if params[:license][:conditions_array].present?
    # permissions = params[:license][:permissions_array].reject(&:blank?).join(",") if params[:license][:permissions_array].present?
    # limitations = params[:license][:limitations_array].reject(&:blank?).join(",") if params[:license][:limitations_array].present?
    # max_position_items = License.select(:id, :position).pluck(:position).reject!(&:blank?) 
    # max_position =  max_position_items.present? ? max_position_items.max.to_i : 0
    # other_params = {
    #   conditions: conditions.to_s,
    #   permissions: permissions.to_s,
    #   limitations: limitations.to_s,
    #   position: max_position
    # }
    @project_license = License.new(license_params)

    if @project_license.save!
      redirect_to admins_project_licenses_path 
      flash[:success] = "创建成功"
    else
      render :new
      flash[:danger] = "创建失败"
    end
  end

  def edit

  end

  def update
    # conditions = params[:license][:conditions_array].reject(&:blank?).join(",") if params[:license][:conditions_array].present?
    # permissions = params[:license][:permissions_array].reject(&:blank?).join(",") if params[:license][:permissions_array].present?
    # limitations = params[:license][:limitations_array].reject(&:blank?).join(",") if params[:license][:limitations_array].present?

    # other_params = {
    #   conditions: conditions.to_s,
    #   permissions: permissions.to_s,
    #   limitations: limitations.to_s
    # }
    if @project_license.update_attributes(license_params)
      redirect_to admins_project_licenses_path 
      flash[:success] = "更新成功"
    else
      render :edit
      flash[:danger] = "更新失败"
    end
  end

  def destroy
    if @project_license.present?
      if @project_license.destroy
        redirect_to admins_project_licenses_path 
        flash[:success] = "删除成功"
      else
        redirect_to admins_project_licenses_path 
        flash[:success] = "删除失败"
      end
    else
      redirect_to admins_project_licenses_path 
      flash[:success] = "删除失败:许可证已被项目引用"
    end
  end

  # def move
  #   cate_opt = params[:opr]
  #   cate_position = @project_license.position.to_i
  #   move_status = up_and_down(cate_opt,@project_license,cate_position,"license")
  #   if move_status == 0
  #     @c_msg = "移动成功"
  #   else
  #     @c_msg = "移动失败"
  #   end
  # end

  private
  def set_license
    @project_license = License.find_by_id(params[:id])
  end

  def license_params
    params.require(:license).permit(:name,:content)
  end

  def validate_params
    name = params[:license][:name]
    if name.blank? 
      flash[:danger] = "名称不允许为空"
      redirect_to admins_project_licenses_path
    elsif check_license_present?(name) && @project_license.blank?
      flash[:danger] = "创建失败:名称已存在"
      redirect_to admins_project_licenses_path
    end
  end

  def check_license_present?(name)
    return true if name.blank?
    name_downcase = name.downcase
    name_upcase = name.upcase
    name_first_big = name.capitalize
    License.exists?(name: name_downcase) || License.exists?(name: name_upcase) || License.exists?(name: name_first_big)
  end

end
