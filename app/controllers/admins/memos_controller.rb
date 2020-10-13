class Admins::MemosController < Admins::BaseController
  # include Admins::BaseHelper
  # 帖子
  def index
    @memo_hidden_type = params[:hidden] || ""

    memos = Memo.where(parent_id: nil).includes(:author)
    if @memo_hidden_type.present?
      memos = memos.where(hidden: @memo_hidden_type.to_s == "hidden")
    end
    memos = memos.order("created_at desc")
    @memos = paginate memos
    respond_to do |format|
      format.html
      format.js
    end
  end

  def memo_homepage_show
    memo = Memo.find params[:id]
    memo.update_column(:homepage_show, params[:checked]) unless memo.hidden?
    render :json => {status: 1, message: "设置成功!"}
  end

  def memo_hidden
    memo = Memo.find params[:id]
    if params[:checked].to_s == 'true'
      publish_time = Time.now
      action_type = "passed"
      extra = "1"
    else
      publish_time = nil
      action_type = "refuse"
      extra = "2"
    end
    memo.update_attributes(hidden: !(params[:checked].to_s == 'true'), published_at: publish_time) # 勾选代表不隐藏，所以要取反
    CheckedAction.create!(user_id: current_user.id,checkable_type: "Memo",checkable_id: params[:id], action_type: action_type, action_at: Time.now)


    if !memo.hidden? && memo.parent_id.present? && !memo.tidings.exists?(user_id: memo.parent.author_id,trigger_user_id: memo.author_id, extra: "3")
      Tiding.create(:user_id => memo.parent.author_id, :trigger_user_id => memo.author_id,
                 container_id: memo.id, container_type: 'Memo',
                 :parent_container_id => memo.root_id, :parent_container_type => "Memo",
                 :viewed => 0, :tiding_type => "Comment", :extra => "3")

    elsif !memo.hidden?  && memo.parent_id.blank?
      Tiding.create(:user_id => memo.author_id, :trigger_user_id => current_user.id,
                    container_id: memo.id, container_type: 'Memo',
                    :viewed => 0, :tiding_type => "Comment",:extra => extra)

    end
    render :json => {status: 1, message: "设置成功!"}
  end

  def delete_memo
    memo = Memo.find params[:id]
    memo.destroy if memo.hidden?
    redirect_to memo.parent_id.present? ? admins_memo_reply_lists_path : admins_memos_path
  end

  # def memo_reply_list
  #   @menu_type = 8
  #   @sub_type = 4
  #   @memo_hidden_type = params[:hidden] || ""
  #   Rails.logger.info("======================sub_type==================#@sub_type")

  #   memos = Memo.where("parent_id is not null").includes(:author, :parent)
  #   if @memo_hidden_type.present?
  #     memos = memos.where(hidden: @memo_hidden_type.to_s == "hidden")
  #   end
  #   memos = memos.order("created_at desc")
  #   @memos = paginate memos
  #   respond_to do |format|
  #     format.html
  #     format.js
  #   end
  # end

end