class Admins::Topic::ActivityForumsController < Admins::Topic::BaseController
  before_action :find_activity_forum, only: [:edit, :update, :destroy]

  def index 
    q = ::Topic::ActivityForum.ransack(title_cont: params[:search])
    activity_forums = q.result(distinct: true)
    @activity_forums = paginate(activity_forums)
  end

  def new 
    @activity_forum = ::Topic::ActivityForum.new
  end

  def create 
    @activity_forum = ::Topic::ActivityForum.new(activity_forum_params)
    if @activity_forum.save 
      redirect_to admins_topic_activity_forums_path
      flash[:success] = "新增平台动态成功"
    else
      redirect_to admins_topic_activity_forums_path
      flash[:danger] = "新增平台动态失败"
    end
  end

  def edit 
  end

  def update 
    @activity_forum.attributes = activity_forum_params
    if @activity_forum.save 
      redirect_to admins_topic_activity_forums_path
      flash[:success] = "更新平台动态成功"
    else  
      redirect_to admins_topic_activity_forums_path
      flash[:danger] = "更新平台动态失败"
    end
  end

  def destroy 
    if @activity_forum.destroy 
      redirect_to admins_topic_activity_forums_path
      flash[:success] = "删除平台动态成功"
    else  
      redirect_to admins_topic_activity_forums_path
      flash[:danger] = "删除平台动态失败"
    end
  end

  private 
  def find_activity_forum
    @activity_forum = ::Topic::ActivityForum.find_by_id(params[:id])
  end

  def activity_forum_params 
    params.require(:topic_activity_forum).permit(:title, :uuid, :url, :order_index)
  end
end