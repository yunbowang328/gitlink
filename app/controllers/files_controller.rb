class FilesController < ApplicationController
  include MessagesHelper

  before_action :require_login, :check_auth, except: %i[index]
  before_action :find_course, except: %i[public_with_course_and_project mine_with_course_and_project]
  before_action :find_ids, only: %i[bulk_delete bulk_send bulk_move bulk_public bulk_publish]
  before_action :file_validate_sort_type, only: :index
  before_action :validate_send_message_to_course_params, only: :bulk_send
  before_action :set_pagination, only: %i[index public_with_course_and_project mine_with_course_and_project]
  before_action :validate_upload_params, only: %i[upload import]
  before_action :find_file, only: %i[show setting update]
  before_action :publish_params, only: %i[upload import update]

  SORT_TYPE = %w[created_on downloads quotes]

  def index
    sort = params[:sort] || 0 # 0: 降序；1: 升序
    sort_type = params[:sort_type] || 'created_on' # created_on：时间排序， downloads：下载次数排序; quotes: 引用次数排序
    @course_second_category_id = params[:course_second_category_id] || 0 # 0: 为主目录， 其他为次目录id
    @user = current_user
    @attachments = @course_second_category_id.to_i == 0 ? @course.attachments.includes(:course_second_category) : @course.attachments.by_course_second_category_id(@course_second_category_id)
    @attachments = @attachments.includes(author: [:user_extension, :course_members])
                       .ordered(sort: sort.to_i, sort_type: sort_type.strip)

    get_category(@course, @course_second_category_id)
    @total_count = @attachments.size

    if @user.course_identity(@course) == 5
      member = @course.course_members.find_by(user_id: current_user.id, is_active: 1)
      if member.try(:course_group_id).to_i == 0
        @attachments = @attachments.published.unified_setting
      else
        not_atta_ids = @course.attachment_group_settings.none_published.where("course_group_id = #{member.try(:course_group_id)}").pluck(:attachment_id)

        @attachments = @attachments.where.not(id: not_atta_ids).published
      end
    elsif @user.course_identity(@course) > 5
      @attachments = @attachments.publiced.published
    end

    @publish_count = @attachments.published.size
    @unpublish_count = @total_count - @publish_count
    @attachments = @attachments.by_keywords(params[:search])

    @attachments = @attachments.page(@page).per(@page_size)
  end

  def bulk_publish
    return normal_status(403, "您没有权限进行操作") if current_user.course_identity(@course) >= 5
    # tip_exception("请至少选择一个分班") if params[:group_ids].blank? && @course.course_groups.size != 0

    attachments = @course.attachments.by_ids(@attachment_ids)

    ActiveRecord::Base.transaction do
      # 有分班设置时
      # if @course.course_group_module? && @course.course_groups_count != 0 && params[:group_ids]
      #   group_ids = params[:group_ids]&.reject(&:blank?)
      #   charge_group_ids = @course.charge_group_ids(current_user)
      #   publish_groups = charge_group_ids & group_ids if group_ids
      #
      #   attachments.each do |atta|
      #     if atta.published? && !atta.unified_setting || !atta.published?
      #       create_atta_group_settings atta
      #       atta.update_attributes!(unified_setting: 0) if atta.unified_setting
      #       none_publish_settings = atta.attachment_group_settings.where(course_group_id: publish_groups).none_published
      #       none_publish_settings.update_all(publish_time: Time.now)
      #     end
      #   end
      # end

      # 未发布的资源更新状态
      attachments.where(is_publish: 0).update_all(is_publish: 1, publish_time: Time.now)
    end
    render_ok
  end

  def bulk_delete
    ActiveRecord::Base.transaction do
      begin
        @course.attachments.by_ids(@attachment_ids).destroy_all
      rescue Exception => e
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def bulk_send
    return  normal_status(403, "您没有权限进行该操作") unless current_user.teacher_of_course?(@course)
    course_ids = params[:to_course_ids]

    begin
      @attachment_ids.each do |id|
        @attachment = @course.attachments.find_by_id id
        course_ids.each do |course_id|
          course = Course.find_by_id course_id
          unless @attachment.nil? || course.nil?
            course.attachments << course.attachments.build(@attachment.attributes.except("id").merge(
                quotes: 0,
                downloads: 0,
                author_id: current_user.id,
                created_on: Time.now,
                course_second_category_id: 0 # TODO 暂时只支持发送到其他课堂的主目录
            ))
          end
        end
      end
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def bulk_move
    return  normal_status(403, "您没有权限进行该操作") unless current_user.teacher_of_course?(@course)

    to_category_id = params[:to_category_id] || 0 # 默认移动到主目录
    unless to_category_id == 0
      course_second_category = @course.course_second_categories.find_by_id to_category_id
      return normal_status(2, "参数to_category_id有误，该目录不存在") if course_second_category.nil?
    end

    begin
      @course.attachments.by_ids(@attachment_ids).update_all(course_second_category_id: to_category_id)
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def bulk_public
    @user = current_user
    return  normal_status(403, "您没有权限进行该操作") unless @user.teacher_of_course?(@course)

    @course.attachments.by_ids(@attachment_ids).update_all(is_public: 1)
  end

  def public_with_course_and_project
    @attachments = Attachment.publiced.simple_columns
                       .contains_course_and_project
                       .includes(:container, author: :user_extension)
                       .by_filename_or_user_name(params[:search])
                       .ordered(sort: 0, sort_type: 'created_on')


    @total_count = @attachments.size
    @attachments = @attachments.page(@page).per(@page_size)
  end

  def mine_with_course_and_project
    @current_user = current_user
    @attachments = Attachment.mine(current_user)
                       .simple_columns
                       .contains_course_and_project
                       .by_keywords(params[:search])
                       .ordered(sort: 0, sort_type: 'created_on')

    @total_count = @attachments.size
    @attachments = @attachments.page(@page).per(@page_size)
  end

  # 上传资源
  def upload
    attachment_ids = params[:attachment_ids]
    course_second_category_id = params[:course_second_category_id] || 0 # 0: 为主目录， 其他为次目录id
    # is_unified_setting = params.has_key?(:is_unified_setting) ? params[:is_unified_setting] : true
    # publish_time = params[:publish_time]
    # course_group_publish_times = params[:course_group_publish_times] || []

    begin
      attachment_ids.each do |attchment_id|
        attachment = Attachment.find_by_id attchment_id
        unless attachment.nil?
          attachment.container = @course
          attachment.course_second_category_id = course_second_category_id
          attachment.description = params[:description]
          attachment.is_public = params[:is_public] && @course.is_public == 1 ? 1 : 0
          attachment.is_publish = @atta_is_publish
          attachment.delay_publish = @atta_delay_publish
          attachment.publish_time = @atta_publish_time
          attachment.unified_setting = @unified_setting
          if @unified_setting == 0
            attachment_group_setting attachment, params[:group_settings]
          end
          # attachment.set_publish_time(publish_time) if is_unified_setting
          # attachment.set_course_group_publish_time(@course, course_group_publish_times) if @course.course_groups.size > 0 && !is_unified_setting && publish_time.blank?
          attachment.save!
        end
      end
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  # 选用资源 & 导入资源
  def import
    return  normal_status(403, "您没有权限进行该操作") unless current_user.teacher_of_course?(@course) || current_user.student_of_course?(@course)

    attachment_ids = params[:attachment_ids]
    course_second_category_id = params[:course_second_category_id] || 0 # 0: 为主目录， 其他为次目录id

    begin
      attachment_ids.each do |attachment_id|
        ori = Attachment.find_by_id(attachment_id)
        # 同一个资源可以多次发送到课堂
        # @course.attachments.each do |att|
        #   @exist = false
        #   if att.id == ori.id || (!att.copy_from.nil? && !ori.copy_from.nil? && att.copy_from == ori.copy_from) || att.copy_from == ori.id || att.id == ori.copy_from
        #     att.created_on = Time.now
        #     att.save
        #     @exist = true
        #     break
        #   end
        # end
        #
        # next if @exist
        attach_copied_obj = ori.copy
        attach_copied_obj.container = @course
        attach_copied_obj.created_on = Time.now
        attach_copied_obj.author = current_user
        attach_copied_obj.is_public = 0
        attach_copied_obj.is_publish = @atta_is_publish
        attach_copied_obj.delay_publish = @atta_delay_publish
        attach_copied_obj.publish_time = @atta_publish_time
        attach_copied_obj.unified_setting = @unified_setting
        if @unified_setting == 0
          attachment_group_setting attach_copied_obj, params[:group_settings]
        end
        attach_copied_obj.course_second_category_id = course_second_category_id
        attach_copied_obj.copy_from = ori.copy_from.nil? ? ori.id : ori.copy_from
        if attach_copied_obj.attachtype == nil
          attach_copied_obj.attachtype = 4
        end
        attach_copied_obj.save
        ori.update_columns(quotes: ori.quotes.to_i + 1)
      end
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  # 资源设置
  def update
    return normal_status(403, "您没有权限进行该操作") if current_user.course_identity(@course) >= 5 && @file.author != current_user

    is_public = params[:is_public]

    @old_attachment = @file
    @new_attachment = Attachment.find_by_id params[:new_attachment_id]

    begin
      unless @new_attachment.nil?
        @new_attachment_history = @old_attachment.become_history
        @new_attachment_history.save!

        old_course_second_category_id = @old_attachment.course_second_category_id
        @old_attachment.copy_attributes_from_new_attachment(@new_attachment)
        @old_attachment.course_second_category_id = old_course_second_category_id
        @old_attachment.save!
        @new_attachment.delete
      end
      @old_attachment.is_public = is_public == true && @course.is_public == 1 ? 1 : 0
      @old_attachment.is_publish = @atta_is_publish
      @old_attachment.delay_publish = @atta_delay_publish
      @old_attachment.publish_time = @atta_publish_time
      @old_attachment.unified_setting = @unified_setting
      if @unified_setting == 0
        attachment_group_setting @old_attachment, params[:group_settings]
      else
        @old_attachment.attachment_group_settings.destroy_all
      end

      if params[:description] && !params[:description].strip.blank? && params[:description] != @old_attachment.description
        @old_attachment.description = params[:description]
      end

      # @old_attachment.set_public(is_public)

      # if is_unified_setting
      #   @old_attachment.set_publish_time(publish_time)
      #   @old_attachment.attachment_group_settings.destroy_all
      # end

      # if publish_time.blank? && @course.course_groups.size > 0 && !is_unified_setting
      #   @old_attachment.set_course_group_publish_time(@course, course_group_publish_times)
      # end

      @old_attachment.save!
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def show
    return normal_status(403, "您没有权限进行该操作") if !current_user.teacher_of_course?(@course) && current_user != @file.author
    @attachment_histories = @file.attachment_histories
  end

  def histories
    @user = current_user
    @file = @course.attachments.find_by_id params[:id]

    return normal_status(-2, "该课程下没有id为 #{params[:id]}的资源") if @file.nil?
    return normal_status(403, "您没有权限进行该操作") if @user != @file.author && !@user.teacher_of_course?(@course) && !@file.public?

    @attachment_histories = @file.attachment_histories
  end

  def get_category(course, category_id)
    if category_id == 0
      category = course.attachment_course_modules.first
      @category_id = category.try(:id)
      @category_name = category.try(:module_name)
    else
      category = CourseSecondCategory.find category_id
      @category_id = category.try(:id)
      @category_name = category.try(:name)
    end
  end

  private
  def find_file
    @file = Attachment.find params[:id]
  end

  def find_attachment_ids(attachment_ids = params[:attachment_ids])
    return normal_status(-2, "参数attachment_ids不能为空！") if attachment_ids.blank?
    return normal_status(-2, "参数attachment_ids格式错误！") if !attachment_ids.is_a? Array
  end

  def find_course_second_category_id
    course_second_category_id = params[:course_second_category_id] || 0 # 0: 为主目录， 其他为次目录id
    if course_second_category_id != 0
      course_second_category = CourseSecondCategory.find_by(id: course_second_category_id, category_type: "attachment")
      return normal_status(-2, "未来找到course_second_category为 #{course_second_category_id} 的目录") if course_second_category.nil?
    end
  end

  def find_ids
    @attachment_ids = params[:ids] || []
    find_attachment_ids(@attachment_ids)
  end

  def file_validate_sort_type
    normal_status(-2, "参数sort_type暂时只支持 'created_on', 'quotes', 'downloads'") if params.has_key?(:sort_type) && !SORT_TYPE.include?(params[:sort_type].strip)
  end

  def validate_upload_params
    find_attachment_ids
    find_course_second_category_id
  end

  def publish_params
    tip_exception("缺少发布参数") if params[:delay_publish].blank?
    @unified_setting = 1
    # if params[:delay_publish].to_i == 1 && @course.course_group_module? && @course.course_groups_count != 0
    #   tip_exception("分班发布设置不能为空") if params[:group_settings].blank?
    #   min_publish_time = params[:group_settings].pluck(:publish_time).reject(&:blank?).min
    #   max_publish_time = params[:group_settings].pluck(:publish_time).reject(&:blank?).max
    #   tip_exception("分班发布设置不能为空") if min_publish_time.blank?
    #
    #   # 分班设置中的时间一样且包含所有分班 则按统一设置处理，否则是非统一设置
    #   @unified_setting = 0 unless min_publish_time == max_publish_time && params[:group_settings].pluck(:group_id).flatten.sort == @course.course_groups.pluck(:id).sort
    # els
    if params[:delay_publish].to_i == 1
      tip_exception("缺少延期发布的时间参数") if params[:publish_time].blank?
      min_publish_time = params[:publish_time]
    end
    @atta_is_publish = params[:delay_publish].to_i == 1 && min_publish_time.to_time > Time.now ? 0 : 1
    @atta_delay_publish = params[:delay_publish].to_i
    @atta_publish_time = params[:delay_publish].to_i == 1 ? min_publish_time : Time.now
  end

  def create_atta_group_settings atta
    if atta.attachment_group_settings.size != @course.course_groups.size
      @course.course_groups.where.not(id: atta.attachment_group_settings.pluck(:course_group_id)).each do |group|
        atta.attachment_group_settings << AttachmentGroupSetting.new(course_group_id: group.id, course_id: @course.id,
                                                                     publish_time: atta.publish_time)
      end
    end
  end

  def attachment_group_setting attachment, group_setting
    create_atta_group_settings attachment
    group_setting.each do |setting|
      tip_exception("分班id不能为空") if setting[:group_id].length == 0
      tip_exception("发布时间不能为空") if setting[:publish_time].blank?
      AttachmentGroupSetting.where(attachment_id: attachment.id, course_group_id: setting[:group_id]).
        update_all(publish_time: setting[:publish_time])
    end
  end
end
