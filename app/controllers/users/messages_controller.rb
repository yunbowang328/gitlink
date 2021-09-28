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
      case atme_params[:atmeable_type]
      when 'Issue'
        SendTemplateMessageJob.perform_now('IssueAtme', @receivers, current_user.id, atme_params[:atmeable_id])
      when 'PullRequest'
        SendTemplateMessageJob.perform_now('PullRequestAtme', @receivers, current_user.id, atme_params[:atmeable_id])
      when 'Journal'
        journal = Journal.find_by_id(atme_params[:atmeable_id])
        if journal.present?
          if journal&.issue&.pull_request.present?
            SendTemplateMessageJob.perform_now('PullRequestAtme', @receivers, current_user.id, atme_params[:atmeable_id])
          else
            SendTemplateMessageJob.perform_now('IssueAtme', @receivers, current_user.id, atme_params[:atmeable_id])
          end
        end
      end
    end
    render_ok
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def delete 
    return render_forbidden unless %w(atme).include?(params[:type])
    result = Notice::Write::DeleteService.call(params[:ids], observed_user.id, message_type)
    return render_error if result.nil? 
      
    render_ok
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def read 
    return render_forbidden unless %w(notification atme).include?(params[:type])
    result = Notice::Write::ChangeStatusService.call(params[:ids], observed_user.id, message_type)
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
      when "2" then 2
      else 
        -1
      end
    end
  end

  def atme_params 
    params.permit(:atmeable_type, :atmeable_id, receivers_login: [])
  end

  def find_receivers
    @receivers = User.where(login: params[:receivers_login])
    return render_not_found if @receivers.size == 0
  end
end