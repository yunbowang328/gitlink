class CommentsController < ApplicationController
  before_action :find_hack
  before_action :require_login


  # 评论
  def create
    begin
      @discuss = @hack.discusses.new(comment_params) # 管理员回复的能够显示
      @discuss.hidden = false
      @discuss.user_id = current_user.id
      @discuss.save!
    rescue Exception => e
      uid_logger_error("create discuss failed : #{e.message}")
      render_error("评论异常")
    end
  end

  # 回复
  def reply
    begin
      @discuss = @hack.discusses.new(reply_params)
      @discuss.hidden = false
      @discuss.user_id = current_user.id
      @discuss.root_id = params[:comments][:parent_id]
      @discuss.save!
    rescue Exception => e
      uid_logger_error("reply discuss failed : #{e.message}")
      render_error("回复评论异常")
    end
  end

  # 列表
  def index
    discusses =
        if current_user.admin_or_business?
          @hack.discusses.where(root_id: nil)
        else
          @hack.discusses.where(root_id: nil, hidden: false)
        end
    @discusses_count = discusses.count
    @discusses= paginate discusses
  end

  # 删除
  def destroy
    @hack.discusses.find_by(id: params[:id]).destroy
    render_ok
  end

  # 隐藏、取消隐藏
  def hidden
    if current_user.admin_or_business?
      @discuss = @hack.discusses.where(id: params[:id]).first
      @discuss.update_attribute(:hidden, params[:hidden].to_i == 1)
      sucess_status
    else
      Educoder::TipException(403, "..")
    end
  end


  private
  def find_hack
    @hack = Hack.find_by_identifier(params[:hack_identifier])
  end

  def comment_params
    params.require(:comments).permit(:content)
  end

  def reply_params
    params.require(:comments).permit(:content, :parent_id)
  end
end
