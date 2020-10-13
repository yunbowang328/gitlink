class Admins::MemoReplyListsController < Admins::BaseController

  def index 
    @memo_hidden_type = params[:hidden] || ""
    memos = Memo.where("parent_id is not null").includes(:author, :parent)
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
end