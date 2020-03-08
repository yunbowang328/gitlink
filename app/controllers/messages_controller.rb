class MessagesController < ApplicationController
  include MessagesHelper

  SORT_TYPE = %w[time hot]

  before_action :require_login, :check_auth, only: %i[create update sticky_top bulk_delete create destroy bulk_send bulk_move bulk_public]
  before_action :find_board, only: [:create, :index, :bulk_delete, :bulk_move, :bulk_send, :bulk_public]
  before_action :find_message, only: [:update, :destroy, :sticky_top, :reply_list, :destroy, :reply]
  before_action :validate_delete_params, only: %i[bulk_delete bulk_public]
  before_action :message_validate_create_params, only: :create
  before_action :validate_update_params, only: :update
  before_action :validate_sort_type, only: :index
  before_action :validate_send_message_to_course_params, only: :bulk_send
  before_action :validate_move_params, only: :bulk_move

  def index
    @page  = params[:page]  || 1
    @page_size = params[:page_size] || 15

    sort = params[:sort].to_i == 1 ? 'asc' : 'desc'
    sort_type = params[:sort_type] || 'time'

    if @board.parent_id == 0
      messages = Message.where(board_id: @board.course.boards.pluck(:id))
    else
      messages = @board.messages
    end
    messages = messages.root_nodes.by_keywords(params[:search])

    messages = messages.reorder('(sticky = 1) DESC') # 置顶

    messages =
      case sort_type
      when 'time' then messages.order("created_on #{sort}")
      when 'hot' then messages.order("descendants_count #{sort}")
      else messages.order("created_on #{sort}")
      end

    messages = messages.includes(:author, :board)
    @messages = Kaminari.paginate_array(messages).page(@page).per(@page_size)

    ids = @messages.map(&:id)
    @praises_count_map = Message.where(root_id: ids).group(:root_id).sum(:praises_count)
  end

  def reply_list
    @page  = params[:page]  || 1
    @page_size = params[:page_size] || 10
    @current_user = current_user || nil

    @messages = @message.children.preload_messages.includes(:message_detail, :praise_treads)
    # @messages = @messages.ordered(sort: 1) unless @message.parent_id.nil?

    @user_course_identity = current_user.course_identity(@message.board.course)
    case @user_course_identity
    when 5, 6, 7
      @messages = @messages.visible
    end

    @messages = @messages.reorder("messages.created_on desc")
    @messages = @messages.page(@page).per(@page_size)
  end

  def reply
    return normal_status(-1, "回复内容不能为空") if params[:content].blank?
    return normal_status(-1, "回复内容不能超过2000字符") if params[:content].length > 2000
    @reply = Message.create!(board: @message.board, root_id: @message.root_id || @message.id,
                             author: current_user, parent: @message,
                             message_detail_attributes: {
                                content: params[:content]
                             })
  end

  def sticky_top
    return normal_status(403, "您没有权限进行该操作") unless current_user.teacher_of_course?(@message.board.course)

    @message.update_attributes(:sticky => @message.sticky == 1 ? 0 : 1)
  end

  def bulk_delete
    ActiveRecord::Base.transaction do
      begin
        @messages = @board.messages.by_ids(params[:ids])
        @messages.destroy_all
      rescue Exception => e
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
     end
  end

  def new
    @message = Message.new
  end

  def show
    @message =  Message.includes(:attachments, :message_detail,
                                  :children, :author => :user_extension,
                                  :board => [{course: :board_course_modules}])
                                  .find_by_id params[:id]
    return normal_status(-2, "ID为#{params[:id]}的帖子不存在") if @message.nil?

    @attachment_size = @message.attachments.size
    @message.update_visits
    @current_user = current_user
  end

  def update
    return normal_status(403, "您没有权限进行该操作") if current_user != @message.author && !current_user.teacher_of_course?(@message.board.course)

    begin
      board = @message.board&.course&.boards.find_by!(id: params[:select_board_id])

      email_notify = @message.email_notify ? 1 : @message.board&.course.email_notify && params[:email_notify]
      send_email = !@message.email_notify && email_notify
      h = {is_md: true, email_notify: email_notify, board_id: board&.id}
      m_params = message_params.merge(h)
      @message.update_attributes(m_params)
      Attachment.associate_container(params[:attachment_ids], @message.id, @message.class.name)
      @message.update_content(params[:content])
      notify_course_students(@message, @message.board&.course) if send_email
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def create
    return normal_status(403, "您没有权限进行该操作") unless current_user.admin_or_business? || current_user.member_of_course?(@board.course)

    begin
      @message = Message.new(message_params)
      @message.author = current_user
      @message.board_id = params[:select_board_id]
      @message.message_detail_attributes = {content: params[:content]}
      @message.email_notify = @board.course.email_notify && params[:email_notify] ? 1 : 0
      @message.save!
      Attachment.associate_container(params[:attachment_ids], @message.id, @message.class.name)
      if @board.course.email_notify && params[:email_notify]
        notify_course_students @message, @board.course
      end
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def destroy
    begin
      return normal_status(403, "您没有权限进行该操作") if current_user.course_identity(@message.board.course) >= 5 || @message.author != current_user
      @message.destroy!
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def bulk_send
    return  normal_status(403) unless current_user.teacher_or_admin?(@board.course)
    ids = params[:ids]
    course_ids = params[:to_course_ids]

    begin
      ids.each do |id|
        @message = Message.find_by_id id
        if @message.try(:parent_id).nil?  # TODO 暂时只支持目录下的跟节点发送
          course_ids.each do |course_id|
            course = Course.find course_id
            new_message = Message.create!(board: course.course_board,
                                          subject: @message.subject,
                                          author: current_user,
                                          message_detail_attributes: {
                                            content: @message.try(:message_detail).try(:content)
                                          }
                                        )
            @message.copy_attachments_to_new_message(new_message, current_user)
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
    # 课堂的目录之间移动，有子栏目的才显示此项
    return normal_status(403) unless current_user.teacher_of_course?(@board.course)

    Message.bulk_move_to_other_board(params[:ids], params[:to_board_id])
  end

  def bulk_public
    @messages = @board.messages.root_nodes.by_ids Array(params[:ids])
    @messages.update_all(is_public: true)
  end

  private
  def validate_sort_type
    normal_status(2, "参数sort_type暂时只支持 'time', 'hot'两种") if params.has_key?(:sort_type) && !SORT_TYPE.include?(params[:sort_type].strip)
  end

  def find_message
    begin
      @message = Message.find params[:id]
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
    end
  end

  def message_params
    params.require(:message).permit(:subject, :sticky)
  end

  def notify_course_students message, course
    course.students.includes(:user).each do |student|
      UserMailer.course_message_email(student&.user&.mail, message.id).deliver_later if student&.user&.mail
    end
  end
end
