class Users::HeadmapsController < Users::BaseController
  def index 
    result = Gitea::User::HeadmapService.call(observed_user.login, start_stamp, end_stamp)
    @headmaps = result[2]
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 
  def start_stamp
    if params[:year].present?
      Date.new(params[:year], 1).to_time.to_i
    else 
      Date.today.to_time.to_i - 365*24*60*60
    end
  end

  def end_stamp 
    if params[:year].present?
      Date.new(params[:year], 1).to_time.to_i + 365*24*60*60
    else 
      Date.today.to_time.to_i 
    end
  end
end