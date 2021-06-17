class Admins::FaqsController < Admins::BaseController
  before_action :find_faq, only: [:edit,:update, :destroy]

  def index
    sort_by = Faq.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'updated_at'
    sort_direction = %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'

    keyword = params[:keyword].to_s.strip
    collection = Faq.search_question(keyword).order("#{sort_by} #{sort_direction}")
    @faqs = paginate collection
  end

  def new 
    @faq = Faq.new
  end

  def edit 
  end

  def update
    begin
      @faq.update!(faq_params)
      flash[:success] = '修改成功'
    rescue Exception
      flash[:danger] = @faq.errors.full_messages.to_sentence
    end

    redirect_to admins_faqs_path
  end

  def destroy
    @faq.destroy

    redirect_to admins_faqs_path 
    flash[:success] = "删除成功"
  end

  def create
    @faq = Faq.new(faq_params)
    begin
      @faq.save!
      flash[:success] = '创建成功'
    rescue Exception
      flash[:danger] = @faq.errors.full_messages.to_sentence
    end
    redirect_to admins_faqs_path
  end
  
  private
  def find_faq
    @faq = Faq.find params[:id]
  end
  
  def faq_params
    params.require(:faq).permit(:question, :url)
  end
  
end
