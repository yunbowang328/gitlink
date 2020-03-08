class MemosController < ApplicationController
  before_action :require_login, except: [:show, :index]
  before_action :check_account, only: [:new, :create, :reply]
  before_action :set_memo, only: [:show, :edit, :update, :destroy, :sticky_or_cancel, :hidden, :more_reply]
  before_action :validate_memo_params, only: [:create, :update]
  before_action :owner_or_admin, only: [:edit, :update, :destroy]
  before_action :require_business, only: [:sticky_or_cancel, :hidden]

  include ApplicationHelper
  # GET /memos
  # GET /memos.json
  def index
    @user = current_user
    @memos = Memo.all
    s_order = (params[:order] == "replies_count" ? "all_replies_count" : params[:order]) || "updated_at"
    # @tidding_count = unviewed_tiddings(current_user) if current_user.present?
    page = params[:page] || 1
    limit = params[:limit] || 15
    search = params[:search]
    forum_id = params[:forum]
    tag_repertoire_id = params[:tag_repertoire_id]

    sql =
        if forum_id
          !search.blank? ? "forum_id = #{forum_id} and root_id is null and subject like '%#{search}%'" :
              "forum_id = #{forum_id} and root_id is null"
        elsif !search.blank?
          "forum_id in(3, 5, 16) and root_id is null and subject like '%#{search}%'"
        else
          "forum_id in(3, 5, 16) and root_id is null"
        end

    if tag_repertoire_id
      memo_ids = MemoTagRepertoire.where(tag_repertoire_id: tag_repertoire_id).pluck(:memo_id)
      memo_ids = memo_ids ? memo_ids.join(",") : -1
      sql += " and #{Memo.table_name}.id in(#{memo_ids})"
    end

    if params[:order] == "updated_at"
      sql += " and all_replies_count != 0"
    end

    memos = Memo.field_for_list.where("#{sql}")
    @memos_count = memos.length
    @memos = memos.order("sticky = 1 desc, #{Memo.table_name}.#{s_order} desc").page(page).per(limit)
    @memos = @memos.includes(:praise_treads, :tag_repertoires, author: :user_extension)
    # @my_memos_count = Memo.user_posts(current_user.try(:id)).count
    @tags_info = MemoTagRepertoire.find_by_sql("SELECT tag_repertoire_id, tr.name, count(*) cnt
                                               FROM memo_tag_repertoires mtr join tag_repertoires tr on
                                               tr.id = mtr.tag_repertoire_id group by tag_repertoire_id order by cnt desc,
                                               tag_repertoire_id desc limit 9")
    @hot_memos = Memo.field_for_recommend.posts.hot.includes(:tag_repertoires).limit(4)
    @recommend_shixuns = DiscussesService.new.recommends
  end

  # GET /memos/1.json
  def show
    # tidding_count = unviewed_tiddings(current_user) if current_user
    @user = current_user
    @memo.update_column(:viewed_count, @memo.viewed_count+1)
    @memos = @memo.reply_for_memo.includes(:praise_treads, author: :user_extension).order("created_at desc").limit(10)
    @attachments = @memo.attachments
    @recommend_shixuns = DiscussesService.new.recommends
  end

  # GET /memos/new
  def new
    @tag_list = TagRepertoire.field_for_list.order("name asc")
  end

  # GET /memos/1/edit
  def edit
    @tag_list = TagRepertoire.field_for_list.order("name asc")
    @memo_tags = @memo.tag_repertoires.field_for_list
    @attachments = @memo.attachments
  end

  # POST /memos.json
  def create
    ActiveRecord::Base.transaction do
      begin
        @memo = Memo.new(memo_params)
        @memo.author = current_user
        @memo.save!
        Attachment.associate_container(params[:attachment_ids], @memo.id, @memo.class.name)
        params[:tags].each do |tag|
          MemoTagRepertoire.create!(memo_id: @memo.id, tag_repertoire_id: tag)
        end
        render :json => {memo_id: @memo.id, status: 0, message: "帖子创建成功"}
      rescue Exception => e
        tip_exception("帖子创建失败，原因：#{e}")
        raise ActiveRecord::Rollback
      end
    end
  end

  # PATCH/PUT /memos/1.json
  def update
    ActiveRecord::Base.transaction do
      begin
        @memo.update_attributes!(memo_params)
        Attachment.associate_container(params[:attachment_ids], @memo.id, @memo.class.name)
        @memo.memo_tag_repertoires.destroy_all
        params[:tags].each do |tag|
          MemoTagRepertoire.create!(memo_id: @memo.id, tag_repertoire_id: tag)
        end
        normal_status("帖子更新成功")
      rescue Exception => e
        tip_exception("帖子更新失败，原因：#{e}")
        raise ActiveRecord::Rollback
      end
    end
  end

  # DELETE /memos/1
  # DELETE /memos/1.json
  def destroy
    @memo.destroy
    normal_status("删除成功")
  end

  def sticky_or_cancel
    tip_exception("只能对主贴进行置顶操作") unless @memo.parent_id.nil?
    begin
      @memo.update_attributes!(sticky: !@memo.sticky)
      normal_status("更新成功")
    rescue Exception => e
      tip_exception("更新失败，原因：#{e}")
      raise ActiveRecord::Rollback
    end
  end

  def hidden
    tip_exception("不能对主贴进行隐藏操作") if @memo.parent_id.nil?
    begin
      @memo.update_attributes!(hidden: @memo.hidden == 0 ? 1 : 0)
      normal_status("更新成功")
    rescue Exception => e
      tip_exception("更新失败，原因：#{e}")
      raise ActiveRecord::Rollback
    end
  end

  def reply
    tip_exception("parent_id不能为空") if params[:parent_id].blank?
    tip_exception("content不能为空") if params[:content].blank?
    tip_exception("内容不能超过2000字符") if params[:content].length > 2000

    ActiveRecord::Base.transaction do
      begin
        memo = Memo.find_by!(id: params[:parent_id])
        @reply = Memo.new
        @reply.content = params[:content]
        @reply.author = current_user
        @reply.forum_id = memo.forum_id
        @reply.subject = memo.subject
        @reply.root_id = memo.root_id || memo.id
        memo.children << @reply
        m = Memo.find_by!(id: @reply.root_id)
        m.update_attributes!(all_replies_count: m.all_replies_count + 1)
      rescue Exception => e
        tip_exception("回复失败，原因：#{e}")
        raise ActiveRecord::Rollback
      end
    end
  end

  def more_reply
    @user = current_user
    page = params[:page] || 2
    limit = params[:limit] || 10
    offset = (page.to_i - 1) * limit
    @memos_count = Memo.where(parent_id: @memo.id).count
    @memos = Memo.limit(limit).where(parent_id: @memo.id).includes(:author, :praise_treads).order("created_at desc").offset(offset)
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_memo
    @memo = Memo.find(params[:id])
  end

  def owner_or_admin
    tip_exception(403, "无权限操作") unless @memo.author == current_user || current_user.admin? || current_user.business?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def memo_params
    params.require(:memo).permit(:subject, :content, :forum_id)
  end

  def validate_memo_params
    tip_exception("话题名称不能为空") if params[:subject].blank?
    tip_exception("话题内容不能为空") if params[:content].blank?
    tip_exception("话题类型不能为空") if params[:forum_id].blank?
    tip_exception("技术标签不能为空") if params[:forum_id].to_i == 5 && params[:tags].blank?
  end

end
