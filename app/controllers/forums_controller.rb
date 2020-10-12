# encoding=utf-8
# For react
class ForumsController < ApplicationController
  before_action :require_login, :only => [:new, :edit]
  include ApplicationHelper

  def show
    render_react
  end

  def new
    render_react
  end

  def index
    render_react
  end


  def edit
    render_react
  end

  def shixun_discuss
    render_react
  end

  def manage
    render_react
  end

  def detail
    render_react
  end

  def theme
    render_react
  end

  private
  def render_react
    render "/common/index", :layout => false
  end

end


# # encoding: utf-8
# # added by fq
# class ForumsController < ApplicationController
#   layout "users_base"
#   include ApplicationHelper
#   # GET /forums
#   # GET /forums.json
#   before_action :find_forum_if_available
#   before_action :authenticate_user_edit, :only => [:edit, :update]
#   before_action :authenticate_user_destroy, :only => [:destroy]
#   before_action :require_login, :only => [:new, :create,:destroy,:update,:edit]
#   before_action :check_authentication
#
#   helper :sort
#   include SortHelper
#
#   PageLimit = 20
#   def create_feedback
#     if User.current.logged?
#       #@memo = Memo.new(params[:memo])
#       #@memo.forum_id = "1"
#       #@memo.author_id = User.current.id
#       #@forum = @memo.forum
#       cs = CommentService.new
#       @memo,message = cs.create_feedback params,User.current
#       respond_to do |format|
#         if !@memo.new_record?
#           if params[:direct]
#             format.html { redirect_to forums_path() }
#           else
#             format.html { redirect_to forum_path(@memo.forum) }
#           end
#           # format.html { redirect_to forum_path(@memo.forum) }
#         else
#           sort_init 'updated_at', 'desc'
#           sort_update 'created_at' => "#{Memo.table_name}.created_at",
#                       'replies' => "#{Memo.table_name}.replies_count",
#                       'updated_at' => "COALESCE (last_replies_memos.created_at, #{Memo.table_name}.created_at)"
#
#           @topic_count = @forum.topics.count
#           @topic_pages = Paginator.new @topic_count, per_page_option, params['page']
#           @memos = @forum.topics.
#               reorder("#{Memo.table_name}.sticky DESC").
#               includes(:last_reply).
#               limit(@topic_pages.per_page).
#               offset(@topic_pages.offset).
#               order(sort_clause).
#               preload(:author, {:last_reply => :author}).
#               all
#
#           flash.now[:error] = "#{l :label_memo_create_fail}: #{@memo.errors.full_messages[0]}"
#           # back_error_page = @memo.parent_id.nil? ? forum_path(@forum) : forum_memo_path(@forum, @memo.parent_id)
#           format.html { render action: :show, layout: 'base_forums' }#, error: "#{l :label_memo_create_fail}: #{@memo.errors.full_messages[0]}" }
#           format.json { render json: @memo.errors, status: :unprocessable_entity }
#         end
#       end
#     else
#       respond_to do |format|
#         format.html { redirect_to signin_path }
#       end
#     end
#   end
#
#   def mail_feedback
#     @user = User.where(:id => params[:user_id]).first
#     unless @user.nil?
#       cs = CommentService.new
#       @memo, message = cs.create_feedback params, @user
#     end
#     respond_to do |format|
#       format.js
#     end
#   end
#
#   def forum_create_memo
#     @memo = Memo.new
#     @my_forums_count = Forum.where(:creator_id => User.current.id).count
#     @my_memos_count = Memo.where(:author_id => User.current.id).count
#     @forums = Forum.reorder("topic_count desc,updated_at desc")
#     respond_to do |format|
#       format.js
#       format.html {render layout: 'base_new_forum'}
#     end
#   end
#
#   def create_memo
#     @memo = Memo.new(params[:memo])
#     @memo.forum_id = @forum.id
#     @memo.author_id = User.current.id
#
#     @memo.save_attachments(params[:attachments] || (params[:memo] && params[:memo][:uploads]))
#
#     respond_to do |format|
#       if @memo.save
#         if params[:asset_id]
#          ids = params[:asset_id].split(',')
#          update_kindeditor_assets_owner ids ,@memo.id,OwnerTypeHelper::MEMO
#         end
#         #end
#         format.html { redirect_to (forum_memo_url(@forum, (@memo.parent_id.nil? ? @memo : @memo.parent_id))), notice: "#{l :label_memo_create_succ}" }
#         format.json { render json: @memo, status: :created, location: @memo }
#       else
#         sort_init 'updated_at', 'desc'
#         sort_update 'created_at' => "#{Memo.table_name}.created_at",
#                     'replies' => "#{Memo.table_name}.replies_count",
#                     'updated_at' => "COALESCE (last_replies_memos.created_at, #{Memo.table_name}.created_at)"
#
#         @topic_count = @forum.topics.count
#         @topic_pages = Paginator.new @topic_count, per_page_option, params['page']
#         @memos = @forum.topics.
#                         reorder("#{Memo.table_name}.sticky DESC").
#                         includes(:last_reply).
#                         limit(@topic_pages.per_page).
#                         offset(@topic_pages.offset).
#                         order(sort_clause).
#                         preload(:author, {:last_reply => :author}).
#                         all
#         @memos
#         flash.now[:error] = "#{l :label_memo_create_fail}: #{@memo.errors.full_messages[0]}"
#         # back_error_page = @memo.parent_id.nil? ? forum_path(@forum) : forum_memo_path(@forum, @memo.parent_id)
#         format.html { render action: :show, layout: 'base_forums' }#, error: "#{l :label_memo_create_fail}: #{@memo.errors.full_messages[0]}" }
#         format.json { render json: @memo.errors, status: :unprocessable_entity }
#       end
#     end
#   end
#
#   # id: 1 问题反馈   3 操作指南  5 技术分享
#   def index
#
#     render "/common/index", :layout => false
#   end
#
#   # GET /forums/1
#   # GET /forums/1.json
#   def show
#     # sort_init 'updated_at', 'desc'
#     # sort_update 'created_at' => "#{Memo.table_name}.created_at",
#     #             'replies' => "#{Memo.table_name}.replies_count",
#     #             'updated_at' => "COALESCE (last_replies_memos.created_at, #{Memo.table_name}.created_at)"
#     order = ""
#     @order_str = ""
#     if(params[:reorder_complex])
#       order = "#{Memo.table_name}.sticky desc, last_replies_memos.created_at #{params[:reorder_complex]}, #{Memo.table_name}.created_at #{params[:reorder_complex]}"
#       @order_str = "reorder_complex="+params[:reorder_complex]
#     elsif(params[:reorder_popu])
#       order = "#{Memo.table_name}.sticky desc, replies_count #{params[:reorder_popu]}"
#       @order_str = "reorder_popu="+params[:reorder_popu]
#     elsif(params[:reorder_time])
#      order = "#{Memo.table_name}.sticky desc, #{Memo.table_name}.updated_at #{params[:reorder_time]}"
#      @order_str = "reorder_time="+params[:reorder_time]
#     else
#       order = "#{Memo.table_name}.sticky desc, #{Memo.table_name}.updated_at desc"
#       @order_str = "reorder_time=desc"
#     end
#     @memo = Memo.new(:forum => @forum)
#     @topic_count = @forum.topics.count
#     @limit = 20
#     @is_remote = true
#     @topic_pages = Paginator.new @topic_count, @limit, params['page'] || 1
#     @memos =  paginateHelper @forum.topics.includes(:last_reply).reorder(order).preload(:author, {:last_reply => :author}), @limit
#     @my_topic_count =   Memo.where("forum_id = #{@memo.forum_id} and parent_id is null").count
#     @my_replies_count =  Memo.where("forum_id = #{@memo.forum_id} and parent_id is not null").count
#     @errors = params[:errors]
#     # 推荐贴吧
#     @forums = Forum.where("id !=?", @forum.id).reorder("topic_count desc,updated_at desc").first(3)
#     respond_to do |format|
#       format.js
#       format.html {
#         render :layout => 'base_new_forum'
#       }# show.html.erb
#       format.json { render json: @forum }
#     end
#   end
#
#   # GET /forums/new
#   # GET /forums/new.json
#   def new
#     @forum = Forum.new
#     respond_to do |format|
#       format.html # new.html.erb
#       format.js
#       format.json { render json: @forum }
#     end
#   end
#
#   # GET /forums/1/edit
#   def edit
#     @forum = Forum.find(params[:id])
#     respond_to do |format|
#       format.html
#       format.js
#     end
#   end
#
#   # POST /forums
#   # POST /forums.json
#   def create
#     @forum = Forum.new(params[:forum])
#     @forum.creator_id = User.current.id
#     if @forum.save
#       # Time 2015-03-24 17:07:05
#       # Author lizanle
#       # Description after save后需要进行资源记录的更新
#       # owner_type = 2 对应的是 forum
#       @save_flag = true
#       if params[:asset_id]
#         ids = params[:asset_id].split(',')
#         update_kindeditor_assets_owner ids, @forum.id, OwnerTypeHelper::FORUM
#       end
#       #end
#       respond_to do |format|
#           format.js{ redirect_to forums_path, notice: l(:label_forum_create_succ)}
#           format.html { redirect_to @forum, notice: l(:label_forum_create_succ) }
#           format.json { render json: @forum, status: :created, location: @forum }
#       end
#     else
#       @save_flag=false
#       respond_to do |format|
#         flash.now[:error] = "#{l :label_forum_create_fail}: #{@forum.errors.full_messages[0]}"
#         format.js
#         format.html { render action: "new" }
#         format.json { render json: @forum.errors, status: :unprocessable_entity }
#       end
#     end
#   end
#
#   # PUT /forums/1
#   # PUT /forums/1.json
#   def update
#     @forum = Forum.find(params[:id])
#     respond_to do |format|
#       if @forum.update_attributes(params[:forum])
#         format.js
#         format.html { redirect_to @forum, notice: l(:label_forum_update_succ) }
#         format.json { head :no_content }
#       else
#         flash.now[:error] = "#{l :label_forum_update_fail}: #{@forum.errors.full_messages[0]}"
#         format.js
#         format.html { render action: "edit" }
#         format.json { render json: @forum.errors, status: :unprocessable_entity }
#       end
#     end
#   end
#
#   # DELETE /forums/1
#   # DELETE /forums/1.json
#   def destroy
#     @forum = Forum.find(params[:id])
#     @forum.destroy
#
#     respond_to do |format|
#       format.html { redirect_to forums_url }
#       format.json { head :no_content }
#     end
#   end
#
#   # 更新贴吧描述
#   def update_memo_description
#     @forum = Forum.find(params[:id])
#     if @forum.blank?
#       result = { :result => false }
#     else
#       forum_decription = params[:forum][:description]
#       @forum.update_attributes(:description => forum_decription )
#       result = { :result => true }
#     end
#     render :json => result
#   end
#
#   def search_forum
#     # @forums = paginateHelper Forum.where("name LIKE '%#{params[:name]}%'")
#     q = "%#{params[:name].strip}%"
#     (redirect_to forums_url, :notice => l(:label_sumbit_empty);return) if params[:name].blank?
#     @offset, @limit = api_offset_and_limit({:limit => 10})
#     @forums_all = Forum.where("name LIKE ?", q)
#     @forums_count = @forums_all.count
#     @forums_pages = Paginator.new @forums_count, @limit, params['page']
#
#     @offset ||= @forums_pages.offset
#     @forums = @forums_all.offset(@offset).limit(@limit).all
#     respond_to do |format|
#       format.html {
#         render 'index'
#       }
#       format.json { render json: @forums }
#     end
#   end
#
#   def search_memo
#     q = "%#{params[:name].strip}%"
#
#     limit = PageLimit
#     @memo = Memo.new
#     @offset, @limit = api_offset_and_limit({:limit => limit})
#     @forum = Forum.find(params[:id])
#     @memos_all = @forum.topics.where("subject LIKE ?", q)
#     @topic_count = @memos_all.count
#     @topic_pages = Paginator.new @topic_count, @limit, params['page']
#
#     @offset ||= @topic_pages.offset
#     @memos = @memos_all.offset(@offset).limit(@limit).all
#     respond_to do |format|
#       format.html {
#         render 'show', :layout => 'base_forums'
#       }
#       format.json { render json: @forum }
#     end
#   end
#
#   #检查forum的名字
#   def check_forum_name
#     begin
#       forum_name = params[:forum_name]
#       if params[:forum_id]
#         result = Forum.where("name = '#{forum_name}' and id != #{params[:forum_id]}").first.blank? ? {:result => true} : {:result => false}
#       else
#         result = Forum.where(:name => forum_name).first.blank? ? {:result => true} : {:result => false}
#       end
#     rescue Exception => e
#       puts e
#     end
#     render :json => result
#    # if params[:forum_id]
#    #   forum_name_exist = Forum.where("name = '#{params[:forum_name]}' and id != #{params[:forum_id]}").count >= 1 ? true : false
#    # else
#    #   forum_name_exist = Forum.where("name = '#{params[:forum_name]}' ").count >= 1 ? true : false
#    # end
#    # render :text => forum_name_exist
#   end
#
#
#
#
#   #添加论坛tag
#   def add_forum_tag
#     @forum = Forum.find(params[:id])
#     unless @forum.nil?
#       @forum.tag_list.add(params[:tag_str].split(','))
#       @forum.save
#     end
#     respond_to do |format|
#       format.js {render :delete_forum_tag}
#     end
#   end
#
#   #删除forum的tag
#   def delete_forum_tag
#     @tag_id = (ActsAsTaggableOn::Tag.find_by_name(params[:tag_name])).id
#     #forum的taggable_type = 5
#     @taggings = ActsAsTaggableOn::Tagging.find_by_tag_id_and_taggable_id_and_taggable_type(@tag_id,params[:id],'Forum')
#
#     unless @taggings.nil?
#       @taggings.delete
#     end
#
#     # 是否还有其他记录 引用了 tag_id
#     @tagging = ActsAsTaggableOn::Tagging.find_by_tag_id(@tag_id)
#     # 如果taggings表中记录已经不存在 ，那么检查tags表 作删除动作
#     if @tagging.nil?
#       @tag = ActsAsTaggableOn::Tag.find_by_id(@tag_id)
#       @tag.delete unless @tag.nil?
#     end
#     @forum = Forum.find(params[:id])
#     respond_to do |format|
#       format.js
#     end
#   end
#
#   private
#
#   def find_forum_if_available
#     @forum = Forum.find(params[:id]) if params[:id]
#   rescue ActiveRecord::RecordNotFound
#     render_404
#     nil
#     end
#
#   def authenticate_user_edit
#     find_forum_if_available
#     render_403 unless @forum.editable_by? User.current
#   end
#
#   def authenticate_user_destroy
#     find_forum_if_available
#     render_403 unless @forum.destroyable_by? User.current
#   end
# end
