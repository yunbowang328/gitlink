class Admins::Topic::PinnedForumsController < Admins::Topic::BaseController
  before_action :find_pinned_forum, only: [:edit, :update, :destroy]

  def index 
    q = ::Topic::PinnedForum.ransack(title_cont: params[:search])
    pinned_forums = q.result(distinct: true)
    @pinned_forums = paginate(pinned_forums)
  end

  def new 
    @pinned_forum = ::Topic::PinnedForum.new
  end

  def create 
    @pinned_forum = ::Topic::PinnedForum.new(pinned_forum_params)
    if @pinned_forum.save 
      redirect_to admins_topic_pinned_forums_path
      flash[:success] = "新增精选文章成功"
    else
      redirect_to admins_topic_pinned_forums_path
      flash[:danger] = "新增精选文章失败"
    end
  end

  def edit 
  end

  def update 
    @pinned_forum.attributes = pinned_forum_params
    if @pinned_forum.save 
      redirect_to admins_topic_pinned_forums_path
      flash[:success] = "更新精选文章成功"
    else  
      redirect_to admins_topic_pinned_forums_path
      flash[:danger] = "更新精选文章失败"
    end
  end

  def destroy 
    if @pinned_forum.destroy 
      redirect_to admins_topic_pinned_forums_path
      flash[:success] = "删除精选文章成功"
    else  
      redirect_to admins_topic_pinned_forums_path
      flash[:danger] = "删除精选文章失败"
    end
  end

  private 
  def find_pinned_forum
    @pinned_forum = ::Topic::PinnedForum.find_by_id(params[:id])
  end

  def pinned_forum_params 
    params.require(:topic_pinned_forum).permit(:title, :uuid, :url, :order_index)
  end
end