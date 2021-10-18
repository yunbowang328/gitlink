class Users::TemplateMessageSettingsController < Users::BaseController 
  before_action :check_auth 
  before_action :get_current_setting 

  def current_setting 
   
  end

  def update_setting 
    Rails.logger.info setting_params[:notification_body]
    Rails.logger.info setting_params[:email_body]

    @current_setting.notification_body = setting_params[:notification_body].to_hash
    @current_setting.email_body = setting_params[:email_body].to_hash
    return render_error("保存失败") unless @current_setting.save!
  end

  private 
  def check_auth 
    return render_forbidden unless current_user.admin? || observed_logged_user?
  end

  def get_current_setting
    @current_setting = @_observed_user.user_template_message_setting
    @current_setting = UserTemplateMessageSetting.build(@_observed_user.id) if @current_setting.nil?
  end

  def setting_params 
    params.require(:setting).permit(notification_body: {}, email_body: {})
  end

  def valid_setting_params
    setting_params[:notification_body].keys.equal?(UserTemplateMessageSetting.init_notification_body.keys) && setting_params[:email_body].keys.equal?(UserTemplateMessageSetting.init_email_body)
  end
  
end