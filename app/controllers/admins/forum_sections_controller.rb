#论坛的板块设置
class Admins::ForumSectionsController < Admins::BaseController
  before_action :set_forum, except: [:index, :new,:create]

  def index
    @menu_type = 8
    @sub_type = 5

    forum_sections = ForumSection.roots.includes(:forum_moderators).order("position desc")
    @max_position = forum_sections&.maximum(:position).to_i
    @min_position = forum_sections&.minimum(:position).to_i
    @forum_sections_count = forum_sections.size
    # page = (params[:page] || 1).to_i
    # per_page = 15
    # @forum_sections_pages = Paginator.new @forum_sections_count, per_page, page
    # @forum_sections = forum_sections.limit(@forum_sections_pages.per_page).offset(@forum_sections_pages.offset).to_a
    @forum_sections = paginate forum_sections
    respond_to do |format|
      format.html
      format.js
    end
  end

  def new
    @parent_id = params[:parent_id]
  end

  def create
    attachment_id = params[:attachments]&.first
    positions = ForumSection.pluck(:position).select { |a| a.is_a? Integer }
    positions = positions.max.to_i
    if params[:parent_id].present?
      @parent_forum = ForumSection.find_by_id(params[:parent_id])
    end
    if params[:title].blank?
      forum_status = 0
      forum_msg = "不能为空"
    elsif params[:title].strip.length > 20
      forum_status = 0
      forum_msg = "不能超过最大限制：20个字符"
    elsif ForumSection.exists?(title: params[:title].strip)
      forum_status = 0
      forum_msg = "不能重名"
    else
      forum_section_params = {
        user_id: current_user.id,
        title: params[:title].strip,
        position: positions + 1,
        parent_id: params[:parent_id],
        is_recommend: false,
        description: params[:description].to_s.truncate(200)
      }
      @forum_section = ForumSection.new(forum_section_params)
      if @forum_section.save
        if attachment_id.present?
          attachment = Attachment.find(attachment_id)
          attachment.container = @forum_section
          attachment.save
          @forum_section.attachment_id = attachment_id
          @forum_section.save
        end
        forum_status = 1
        forum_msg = "创建成功"
      else
        forum_status = -1
        forum_msg = "创建失败,请重试"
      end
    end
    @forum_status = {status: forum_status, msg: forum_msg}
  end

  def edit
    @children_forum = params[:children_forum]
    @attachment = @forum_section.image_attachment
  end

  def update
    attachment_id = params[:attachments]&.first
    if params[:title].blank?
      forum_status = 0
      forum_msg = "不能为空"
    elsif params[:title].strip.length > 20
      forum_status = 0
      forum_msg = "不能超过最大限制：20个字符"
    elsif params[:title].strip != @forum_section.title && ForumSection.exists?(title: params[:title].strip)
      forum_status = 0
      forum_msg = "不能重名"
    else
      
      if @forum_section.update_attributes(title: params[:title].strip, description: params[:description].to_s.truncate(200))

        unless attachment_id.blank? ||  @forum_section.attachment_id.to_i == attachment_id.to_i
          Attachment.where(id: @forum_section.attachment_id.to_i).destroy_all if @forum_section.attachment_id.present?
          attachment = Attachment.find(attachment_id)
          attachment.container = @forum_section
          attachment.save
          @forum_section.attachment_id = attachment_id
          @forum_section.save
        end
        # if attachment_id.present?
        #   unless  @forum_section.attachment_id.to_i == attachment_id.to_i
        #     if @forum_section.attachment_id.to_i != attachment_id.to_i
        #       Attachment.where(id: @forum_section.attachment_id.to_i).destroy_all
        #     end
        #     attachment = Attachment.find(attachment_id)
        #     attachment.container = @forum_section
        #     attachment.save
        #     @forum_section.attachment_id = attachment_id
        #     @forum_section.save
        #   end
        # end
        forum_status = 1
        forum_msg = "更新成功"
      else
        forum_status = -1
        forum_msg = "更新失败,请重试"
      end
    end
    @edit_forum_status = {status: forum_status, msg: forum_msg}
  end

  def destroy
    if @forum_section.destroy
      delete_status = 1
      delete_msg = "删除成功"
    else
      delete_status = -1
      delete_msg = "删除失败,请稍后重试"
    end
    @delete_status = {status: delete_status, msg: delete_msg}
  end

  def order_forums
    @children_forums = @forum_section.get_children_section("asc")
  end

  def recommend_forums
    @forum_section.update_attribute(:is_recommend, params[:is_recommend])
  end

  def move
    cate_opt = params[:opr]
    cate_position = @forum_section.position.to_i
    move_status = up_and_down(cate_opt,@forum_section,cate_position,"forum_section")
    if move_status == 0
      @c_msg = "移动成功"
    else
      @c_msg = "移动失败"
    end
  end

  private

  def set_forum
    @forum_section = ForumSection.find_by_id(params[:id])
  end

end
