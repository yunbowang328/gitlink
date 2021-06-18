class Admins::ProjectIgnoresController < Admins::BaseController 
  before_action :set_ignore, only: [:edit,:update, :destroy,:show]
  before_action :validate_params, only: [:create, :update]

  def index
    sort_by = Ignore.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'created_at'
    sort_direction = %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
    q = Ignore.ransack(name_cont: params[:search])
    project_ignores = q.result(distinct: true).order("#{sort_by} #{sort_direction}")
    @project_ignores = paginate(project_ignores)
  end

  def new
    @project_ignore = Ignore.new
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
    @project_ignore = Ignore.new(ignore_params)

    if @project_ignore.save!
      redirect_to admins_project_ignores_path 
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
    if @project_ignore.update_attributes(ignore_params)
      redirect_to admins_project_ignores_path 
      flash[:success] = "更新成功"
    else
      render :edit
      flash[:danger] = "更新失败"
    end
  end

  def destroy
    if @project_ignore.present?
      if @project_ignore.destroy
        redirect_to admins_project_ignores_path 
        flash[:success] = "删除成功"
      else
        redirect_to admins_project_ignores_path 
        flash[:success] = "删除失败"
      end
    else
      redirect_to admins_project_ignores_path 
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
  def set_ignore
    @project_ignore = Ignore.find_by_id(params[:id])
  end

  def ignore_params
    params.require(:ignore).permit(:name,:content)
  end

  def validate_params
    name = params[:ignore][:name]
    if name.blank? 
      flash[:danger] = "名称不允许为空"
      redirect_to admins_project_ignores_path
    elsif check_ignore_present?(name) && @project_ignore.blank?
      flash[:danger] = "创建失败:名称已存在"
      redirect_to admins_project_ignores_path
    end
  end

  def check_ignore_present?(name)
    return true if name.blank?
    name_downcase = name.downcase
    name_upcase = name.upcase
    name_first_big = name.capitalize
    Ignore.exists?(name: name_downcase) || Ignore.exists?(name: name_upcase) || Ignore.exists?(name: name_first_big)
  end

end
