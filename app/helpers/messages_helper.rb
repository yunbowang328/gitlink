module MessagesHelper

  def by_user_liked?(obj, user)
    obj.praise_treads.user_liker(user).present?
  end
  # 置顶降序排序（置顶排最前面）
  def sort_by_sticky(messages)
    messages = messages.sort_by {|message| -message.sticky } if messages.map(&:sticky).include?(1)
    return messages
  end

  # 根据回复数（包含二级回复）排序
  def sort_by_all_replies(sort, sort_type, arr)
    return arr unless sort_type == "hot"
    logger.info("####====> order by replies")
    arr.each do |message|
      message.total_replies_count = message.replies_count + message.children.sum(:replies_count)
    end
    return arr.sort_by { |msg| sort == 1 ? msg.total_replies_count : -msg.total_replies_count }
  end

  def validate_delete_params
    return normal_status(403, "") unless current_user.teacher_of_course?(@board.course)
    return normal_status(2, "缺少ids参数！")  if params[:ids].blank?
    return normal_status(2, "参数ids格式不对！") unless  params[:ids].is_a? Array
  end

  def validate_move_params
    return normal_status(2, "参数ids不能为空！") if params[:ids].blank?
    return normal_status(2, "参数ids格式错误！") unless  params[:ids].is_a? Array
    return normal_status(2, "参数to_board_id不能为空！") if params[:to_board_id].blank?
  end

  def message_validate_create_params
    msg = if params[:select_board_id].blank?
      "目录id不能为空！"
    elsif params[:subject].blank?
      "帖子标题不能为空！"
    elsif params[:content].blank?
      "帖子内容不能为空！"
    elsif params.has_key?(:attachment_ids) && !params[:attachment_ids].is_a?(Array)
      "参数attachment_ids格式错误！"
    else
      nil
    end
    normal_status(2, msg) unless msg.nil?
  end

  def validate_update_params
    normal_status(2, "目录id不能为空！") if params.has_key?(:select_board_id) && params[:select_board_id].blank?
    normal_status(2, "帖子标题不能为空！") if params.has_key?(:subject) && params[:subject].blank?
    normal_status(2, "帖子内容不能为空！") if params.has_key?(:content) && params[:content].blank?
  end

  def validate_send_message_to_course_params
    return normal_status(2, "ids参数不能为空！")  if params[:ids].blank?
    return normal_status(2, "参数ids格式不对！") unless  params[:ids].is_a? Array
    return normal_status(2, "to_course_ids参数不能为空！")  if params[:to_course_ids].blank?
    return normal_status(2, "参数to_course_ids格式不对！") unless  params[:to_course_ids].is_a? Array
  end

  def validate_page_size
    return if !params.has_key?(:page_size)
    return normal_status(0, "每页请求的数量只能为5-50")  if params[:page_size].to_i < 5 || params[:page_size].to_i > 50
  end

end
