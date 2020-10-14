class Admins::ForumAppliesController < Admins::BaseController
  # include Admins::BaseHelper

  def index
    @menu_type = 8
    @sub_type = 7
    all_forum_applies = ApplyForum.includes(:forum_section,:reviews, user: :user_extensions)
    @select_type = params[:select_type] || "unconfirm"
    @section_name = params[:section_name] || nil
    @search_name = params[:user_name] || nil
    if @select_type == "unconfirm"
      forum_applies = all_forum_applies.where(is_confirm: 0)
    else
      forum_applies = all_forum_applies.where(is_confirm: [1,2])
    end

    if @section_name.present?
      forum_applies = forum_applies.joins(:forum_section).where("forum_sections.title like ?", "%#{@section_name}%")
    end

    if @search_name.present?
      forum_applies = forum_applies.joins(:user).where("LOWER(users.login) LIKE ? or LOWER(concat(users.lastname, users.firstname)) LIKE ?", "%#{@search_name}%", "%#{@search_name}%")
    end
    forum_applies = forum_applies.order("apply_forums.updated_at desc")
    @forum_applies_count = forum_applies.size
    @forum_applies = paginate forum_applies
    # page = (params[:page] || 1).to_i
    # per_page = 15

   
    # @forum_applies_pages = Paginator.new @forum_applies_count, per_page, page
    # @forum_applies = forum_applies.limit(@forum_applies_pages.per_page).offset(@forum_applies_pages.offset).to_a

  end

  def confirm_apply
    @forum_apply = ApplyForum.find(params[:id])
    @is_confirm = params[:is_confirm].to_i

    review_result = params[:review_result].to_i
    review_params = {
      review_status: review_result,
      reason: params[:reason].present? ? params[:reason] : nil,
      user_id: current_user.id,
      reviewable_type: "ApplyForum",
      reviewable_id: params[:id],
      source: "apply_forum"
    }
    if Review.exists?(reviewable_type: "ApplyForum", reviewable_id: params[:id], source: "apply_forum")
      this_review = Review.where(reviewable_type: "ApplyForum", reviewable_id: params[:id], source: "apply_forum").first
      if this_review.update_attributes(review_params)
        @status = 1
        @message = "操作成功"
      else
        @status = -1
        @message = "操作失败"
      end
    else
      review = Review.new(review_params)
      if review.save
        @status = 1
        @message = "操作成功"
      else
        @status = -1
        @message = "操作失败"
      end
    end

    if @status > 0
      @forum_apply.update_attributes(is_confirm: (review_result+1),deal_time: Time.now)
      exists_moder = ForumModerator.where(user_id: @forum_apply.user_id,forum_section_id: @forum_apply.forum_section_id)
      if review_result == 1
        exists_moder.delete_all if exists_moder.exists?
      elsif review_result == 0
        unless exists_moder.exists?
          ForumModerator.create(user_id: @forum_apply.user_id, forum_section_id: @forum_apply.forum_section_id,is_children: @forum_apply.forum_section.try(:parent_id).present?)
        end
      end

      Tiding.where(container_type: "ForumSection", container_id: @forum_apply.forum_section_id, status: 0).update_all(status: 1)
      Tiding.create(:user_id => @forum_apply.user_id, :trigger_user_id => 1,
                    container_id: @forum_apply.forum_section_id, container_type: 'ForumSection',
                    :parent_container_id => @forum_apply.id, :parent_container_type => "ApplyForum",
                    :viewed => 0,status: 1, :tiding_type => "System",extra: "4")
    end

  end

end