class Admins::BannedUsersController < Admins::BaseController
  # include Admins::BaseHelper

  def index
    @menu_type = 8
    @sub_type = 6
    #被禁言的用户
    all_banned_users = BannedForum.includes(:memo, :author, user: :user_extensions)
    banned_true = all_banned_users.where(is_banned: true)
    @banned_users_size = banned_true.size
    @banned_type = params[:banned_type] || "banned"
    @search_params = params[:search] || nil
    if @banned_type == "banned"
      banned_users = banned_true

    else
      banned_users = all_banned_users.where(is_banned: false)
    end

    if @search_params.present?
      banned_users = banned_users.joins(:user).where("LOWER(users.login) LIKE ? or LOWER(concat(users.lastname, users.firstname)) LIKE ?", "%#{@search_params}%", "%#{@search_params}%")
    end

    banned_users = banned_users.order("updated_at desc")
    @banned_users_count = banned_users.size
    @banned_users = paginate banned_users
    # page = (params[:page] || 1).to_i
    # per_page = 15

    
    # @banned_users_pages = Paginator.new @banned_users_count, per_page, page
    # @banned_users = banned_users.limit(@banned_users_pages.per_page).offset(@banned_users_pages.offset).to_a

  end

  def confirm_banned
    if params[:user_id].blank? || params[:id].blank?
      @status = -1
      @message = "参数缺失"
    else
      before_users_banned = BannedForum.where(user_id:params[:user_id])

      banned_params = {
        user_id: params[:user_id],
        author_id: current_user.id,
        memo_id: params[:id],
        is_banned: false,
        banned_count: before_users_banned.present? ? (before_users_banned.last.banned_count + 1) : 1
      }
      new_banned = BannedForum.new(banned_params)
      if new_banned.save
        before_users_banned&.update_all(is_banned: false) if before_users_banned.present?
        @status = 1
        @message = "取消禁言成功"
      else
        @status = -1
        @message = "取消禁言失败，请稍后重试"
      end
    end


  end



end