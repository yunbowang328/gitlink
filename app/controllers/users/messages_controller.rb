class Users::MessagesController < Users::BaseController 
  before_action :private_user_resources!
  before_action :find_receivers, only: [:create]

  def index 
		limit = params[:limit] || params[:per_page]
		limit = (limit.to_i.zero? || limit.to_i > 15) ? 15 : limit.to_i
		page  = params[:page].to_i.zero? ? 1 : params[:page].to_i
    result = Notice::Read::ListService.call(observed_user.id, message_type, message_status, page, limit)
    return render_error if result.nil?
    @data = result[2]
  end

  def create
    return render_forbidden unless %w(atme).include?(params[:type])
    case params[:type] 
    when 'atme' 
      Notice::Write::CreateAtmeForm.new(atme_params).validate!
      result = Notice::Write::CreateService.call(@receivers.pluck(:id), '发送了一个@我消息', base_url, "IssueAtme", 2)
      return render_error if result.nil?
    end
    render_ok
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def delete 
    return render_forbidden unless %w(atme).include?(params[:type])
    result = Notice::Write::DeleteService.call(params[:ids], observed_user.id)
    return render_error if result.nil? 
      
    render_ok
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def read 
    return render_forbidden unless %w(notification atme).include?(params[:type])
    result = Notice::Write::ChangeStatusService.call(params[:ids], observed_user.id)
    if result.nil? 
      render_error 
    else
      render_ok
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 
  def message_type 
    @message_type = begin
      case params[:type]
      when "notification" then 1
      when "atme" then 2
      else 
        -1
      end
    end
  end

  def message_status 
    @message_status = begin 
      case params[:status]
      when "1" then 1
      else 
        2
      end
    end
  end

  def atme_params 
    params.permit(:atmeable_type, :atmeable_id, receivers_login: [])
  end

  def message_params 
    {
      sender: current_user.id,
      reservers: @receiver.id,
      type: @message_type,
      content: params[:content]
    }
  end

  def find_receivers
    @receivers = User.where(login: params[:receivers_login])
    return render_not_found if @receivers.size == 0
  end
end