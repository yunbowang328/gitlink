class Admins::Topic::ExcellentProjectsController < Admins::Topic::BaseController
  before_action :find_excellent_project, only: [:edit, :update, :destroy]

  def index 
    q = ::Topic::ExcellentProject.ransack(title_cont: params[:search])
    excellent_projects = q.result(distinct: true)
    @excellent_projects = paginate(excellent_projects)
  end

  def new 
    @excellent_project = ::Topic::ExcellentProject.new
  end

  def create 
    @excellent_project = ::Topic::ExcellentProject.new(excellent_project_params)
    if @excellent_project.save 
      redirect_to admins_topic_excellent_projects_path
      flash[:success] = "新增优秀仓库成功"
    else
      redirect_to admins_topic_excellent_projects_path
      flash[:danger] = "新增优秀仓库失败"
    end
  end

  def edit 
  end

  def update 
    @excellent_project.attributes = excellent_project_params
    if @excellent_project.save 
      redirect_to admins_topic_excellent_projects_path
      flash[:success] = "更新优秀仓库成功"
    else  
      redirect_to admins_topic_excellent_projects_path
      flash[:danger] = "更新优秀仓库失败"
    end
  end

  def destroy 
    if @excellent_project.destroy 
      redirect_to admins_topic_excellent_projects_path
      flash[:success] = "删除优秀仓库成功"
    else  
      redirect_to admins_topic_excellent_projects_path
      flash[:danger] = "删除优秀仓库失败"
    end
  end

  private 
  def find_excellent_project
    @excellent_project = ::Topic::ExcellentProject.find_by_id(params[:id])
  end

  def excellent_project_params 
    params.require(:topic_excellent_project).permit(:title, :uuid, :url, :order_index)
  end
end