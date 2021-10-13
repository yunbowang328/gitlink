class Users::SystemNotificationHistoriesController < Users::BaseController 
  before_action :private_user_resources!, only: [:create]
  def create 
    @history = observed_user.system_notification_histories.new(system_notification_id: params[:system_notification_id])
    if @history.save
      render_ok
    else 
      Rails.logger.info @history.errors.as_json
      render_error(@history.errors.full_messages.join(","))
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end
end