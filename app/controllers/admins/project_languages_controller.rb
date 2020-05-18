class Admins::ProjectLanguagesController < Admins::BaseController 
  before_action :get_language, only: [:edit,:update, :destroy]
  before_action :validate_names, only: [:create, :update]

  def index 
    sort_by = params[:sort_by] ||= 'created_at'
    sort_direction = params[:sort_direction] ||= 'desc'
    q = ProjectLanguage.ransack(name_cont: params[:search])
    project_languages = q.result(distinct: true).order("#{sort_by} #{sort_direction}")
    @project_languages = paginate(project_languages)
    
  end

  def new 
    @project_language = ProjectLanguage.new
  end

  def edit 
  end

  def create 
    max_position_items = ProjectLanguage.select(:id, :position).pluck(:position).reject!(&:blank?) 
    max_position =  max_position_items.present? ? max_position_items.max.to_i : 0
    @project_language = ProjectLanguage.new(name: @name,position:max_position)
    if @project_language.save
      redirect_to admins_project_languages_path
      flash[:success] = '创建成功'
    else
      redirect_to admins_project_languages_path
      flash[:danger] = '创建失败'
    end
  end

  def update 
    if @project_language.update_attribute(:name, @name)
      redirect_to admins_project_languages_path
      flash[:success] = '更新成功'
    else 
      redirect_to admins_project_languages_path
      flash[:success] = '更新失败'
    end
  end

  def destroy 
    if @project_language.destroy 
      redirect_to admins_project_languages_path 
      flash[:success] = "项目语言删除成功"
    else 
      redirect_to admins_project_languages_path 
      flash[:danger] = "项目语言删除失败"
    end
  end

  private 

  def get_language
    @project_language = ProjectLanguage.find_by(id: params[:id])
    unless @project_language.present?
      redirect_to admins_project_languages_path 
      flash[:danger] = "项目语言不存在"
    end
  end

  def check_language_present?(name)
    return true if name.blank?
    name_downcase = name.downcase
    name_upcase = name.upcase
    name_first_big = name.capitalize
    ProjectLanguage.exists?(name: name_downcase) || ProjectLanguage.exists?(name: name_upcase) || ProjectLanguage.exists?(name: name_first_big)
  end

  def validate_names 
    @name = params[:project_language][:name].to_s.first(64)
    if @name.blank?
      redirect_to admins_project_languages_path
      flash[:danger] = '名称不能为空'
    elsif check_language_present?(@name) && @project_language.blank?
      redirect_to admins_project_languages_path
      flash[:danger] = '项目语言已存在'
    end
  end
end