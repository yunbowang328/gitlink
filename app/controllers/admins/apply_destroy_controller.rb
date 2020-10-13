class Admins::ApplyDestroyController < Admins::BaseController
  def index 
    memos = Memo.where(destroy_status: 1).includes(:author).order("created_at desc")
    @memos = paginate memos
    respond_to do |format|
      format.html
      format.js
    end
  end

  def confirm_apply_destroy
    memo = Memo.find(params[:id])
    apply_status = params[:confirm]
    if apply_status == "delete"
      memo.destroy
      extra = "d_2"
      Tiding.create!(:user_id => memo.author_id, :trigger_user_id => 0,
        container_id: memo.id, container_type: 'Memo',
        :viewed => 0, :tiding_type => "System", :extra => "d_2")
    else
      memo.common!
      memo.save
      extra = "d_3"
      Tiding.create!(:user_id => memo.author_id, :trigger_user_id => 0,
        container_id: memo.id, container_type: 'Memo',
        :viewed => 0, :tiding_type => "System", :extra => "d_3")
    end
    @status = 1
    @message = "操作成功"
  end
end