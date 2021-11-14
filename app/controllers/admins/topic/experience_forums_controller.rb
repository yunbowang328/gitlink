class Admins::Topic::ExperienceForumsController < Admins::Topic::BaseController
  before_action :find_experience_forum, only: [:edit, :update, :destroy]

  def index 
    q = ::Topic::ExperienceForum.ransack(title_cont: params[:search])
    experience_forums = q.result(distinct: true)
    @experience_forums = paginate(experience_forums)
  end

  def new 
    @experience_forum = ::Topic::ExperienceForum.new
  end

  def create 
    @experience_forum = ::Topic::ExperienceForum.new(experience_forum_params)
    if @experience_forum.save 
      redirect_to admins_topic_experience_forums_path
      flash[:success] = "新增经验分享成功"
    else
      redirect_to admins_topic_experience_forums_path
      flash[:danger] = "新增经验分享失败"
    end
  end

  def edit 
  end

  def update 
    @experience_forum.attributes = experience_forum_params
    if @experience_forum.save 
      redirect_to admins_topic_experience_forums_path
      flash[:success] = "更新经验分享成功"
    else  
      redirect_to admins_topic_experience_forums_path
      flash[:danger] = "更新经验分享失败"
    end
  end

  def destroy 
    if @experience_forum.destroy 
      redirect_to admins_topic_experience_forums_path
      flash[:success] = "删除经验分享成功"
    else  
      redirect_to admins_topic_experience_forums_path
      flash[:danger] = "删除经验分享失败"
    end
  end

  private 
  def find_experience_forum
    @experience_forum = ::Topic::ExperienceForum.find_by_id(params[:id])
  end

  def experience_forum_params 
    params.require(:topic_experience_forum).permit(:title, :uuid, :url, :order_index)
  end
end