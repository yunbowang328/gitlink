class Admins::ProjectCategoriesController < Admins::BaseController 
  before_action :get_category, only: [:edit,:update, :destroy]
  before_action :validate_names, only: [:create, :update]

  def index 
    sort_by = ProjectCategory.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'created_at'
    sort_direction = %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
    q = ProjectCategory.ransack(name_cont: params[:name])
    project_categories = q.result(distinct: true).order("#{sort_by} #{sort_direction}")
    @project_categories = paginate(project_categories)
    
  end

  def new 
    @project_category = ProjectCategory.new
  end

  def edit 
  end

  def create 
    max_position_items = ProjectCategory.select(:id, :position).pluck(:position).reject!(&:blank?) 
    max_position =  max_position_items.present? ? max_position_items.max.to_i : 0

    @project_category = ProjectCategory.new(name: @name,position: max_position, pinned_index: params[:project_category][:pinned_index].to_i)
    if @project_category.save
      redirect_to admins_project_categories_path
      flash[:success] = '创建成功'
    else
      redirect_to admins_project_categories_path
      flash[:danger] = '创建失败'
    end
  end

  def update 
    if @project_category.update_attributes({name: @name, pinned_index: params[:project_category][:pinned_index].to_i})
      save_image_file(params[:logo], 'logo')
      redirect_to admins_project_categories_path
      flash[:success] = '更新成功'
    else 
      redirect_to admins_project_categories_path
      flash[:danger] = '更新失败'
    end
  end

  def destroy 
    if @project_category.destroy 
      redirect_to admins_project_categories_path
      flash[:success] = "删除成功"
    else 
      redirect_to admins_project_categories_path
      flash[:danger] = "删除失败"
    end
  end

  private 

  def get_category
    @project_category = ProjectCategory.find_by(id: params[:id])
    unless @project_category.present?
      redirect_to admins_project_categories_path
      flash[:danger] = "分类不存在"
    end
  end

  def check_language_present?(name)
    return true if name.blank?
    name_downcase = name.downcase
    name_upcase = name.upcase
    name_first_big = name.capitalize
    ProjectCategory.exists?(name: name_downcase) || ProjectCategory.exists?(name: name_upcase) || ProjectCategory.exists?(name: name_first_big)
  end

  def validate_names 
    @name = params[:project_category][:name].to_s.first(64)
    if @name.blank?
      redirect_to admins_project_categories_path
      flash[:danger] = '名称不能为空'
    elsif check_language_present?(@name) && @project_category.blank?
      redirect_to admins_project_categories_path
      flash[:danger] = '分类已存在'
    end
  end

  def save_image_file(file, type)
    return unless file.present? && file.is_a?(ActionDispatch::Http::UploadedFile)

    file_path = Util::FileManage.source_disk_filename(@project_category, type)
    File.delete(file_path) if File.exist?(file_path) # 删除之前的文件
    Util.write_file(file, file_path)
  end
end