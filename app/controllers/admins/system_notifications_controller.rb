class Admins::SystemNotificationsController < Admins::BaseController 
  before_action :get_notification, only: [:history, :edit,:update, :destroy]
  # before_action :validate_identifer, only: [:create, :update]

  def index 
    sort_by = SystemNotification.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'created_at'
    sort_direction = %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
    q = SystemNotification.ransack(subject_cont: params[:search])
    notifications = q.result(distinct: true).order("#{sort_by} #{sort_direction},created_at desc")
    @notifications = paginate(notifications)
  end

  def history
    @users = @notification.users
  end

  def new 
    @notification = SystemNotification.new
  end

  def edit 
  end

  def create 
    @notification = SystemNotification.new(notification_params)
    if @notification.save
      redirect_to admins_system_notifications_path
      flash[:success] = '系统保留关键词创建成功'
    else
      redirect_to admins_system_notifications_path
      flash[:danger] = @notification.errors.full_messages.join(",")
    end
  end

  def update 
    
    respond_to do |format|
      if @notification.update_attributes(notification_params)
        format.html do 
          redirect_to admins_system_notifications_path
          flash[:success] = '系统保留关键词更新成功'
        end
        format.js {render_ok}
      else 
        format.html do 
          redirect_to admins_system_notifications_path
          flash[:danger] = @notification.errors.full_messages.join(",")
        end
        format.js {render_js_error}
      end
    end
  end

  def destroy 
    if @notification.destroy 
      redirect_to admins_system_notifications_path 
      flash[:success] = "系统保留关键词删除成功"
    else 
      redirect_to admins_system_notifications_path 
      flash[:danger] = "系统保留关键词删除失败"
    end
  end

  private 
  def notification_params 
    params.require(:system_notification).permit!
  end

  def get_notification
    @notification = SystemNotification.find_by(id: params[:id])
    unless @notification.present?
      redirect_to admins_system_notifications_path 
      flash[:danger] = "系统保留关键词不存在"
    end
  end
end