class Admins::ReversedKeywordsController < Admins::BaseController 
  before_action :get_keyword, only: [:edit,:update, :destroy]
  # before_action :validate_identifer, only: [:create, :update]

  def index 
    sort_by = ReversedKeyword.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'created_at'
    sort_direction = %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
    q = ReversedKeyword.ransack(identifier_cont: params[:search])
    keywords = q.result(distinct: true).order("#{sort_by} #{sort_direction}")
    @keywords = paginate(keywords)
    
  end

  def new 
    @keyword = ReversedKeyword.new
  end

  def edit 
  end

  def create 
    @keyword = ReversedKeyword.new(keyword_params)
    if @keyword.save
      redirect_to admins_reversed_keywords_path
      flash[:success] = '系统保留关键词创建成功'
    else
      redirect_to admins_reversed_keywords_path
      flash[:danger] = @keyword.errors.full_messages.join(",")
    end
  end

  def update 
    
    respond_to do |format|
      if @keyword.update_attributes(keyword_params)
        format.html do 
          redirect_to admins_reversed_keywords_path
          flash[:success] = '系统保留关键词更新成功'
        end
        format.js {render_ok}
      else 
        format.html do 
          redirect_to admins_reversed_keywords_path
          flash[:danger] = @keyword.errors.full_messages.join(",")
        end
        format.js {render_js_error}
      end
    end
  end

  def destroy 
    if @keyword.destroy 
      redirect_to admins_reversed_keywords_path 
      flash[:success] = "系统保留关键词删除成功"
    else 
      redirect_to admins_reversed_keywords_path 
      flash[:danger] = "系统保留关键词删除失败"
    end
  end

  private 
  def keyword_params 
    params.require(:reversed_keyword).permit!
  end

  def get_keyword
    @keyword = ReversedKeyword.find_by(id: params[:id])
    unless @keyword.present?
      redirect_to admins_reversed_keywords_path 
      flash[:danger] = "系统保留关键词不存在"
    end
  end

  def validate_identifer 
    identifer = keyword_params[:identifier].to_s.downcase
    if identifer.blank?
      redirect_to admins_reversed_keywords_path
      flash[:danger] = '系统保留关键词标识不能为空'
    elsif ProjectLanguage.exists?(name: identifer)
      redirect_to admins_reversed_keywords_path
      flash[:danger] = '系统保留关键词已存在'
    end
  end
end