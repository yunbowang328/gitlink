class UsersController < ApplicationController

  before_action :load_user, only: [:show, :homepage_info]
  before_action :check_user_exist, only: [:show, :homepage_info]
  before_action :require_login, only: %i[me list]
  skip_before_action :check_sign, only: [:attachment_show]

  def list
    scope = User.active.recent.like(params[:search]).includes(:user_extension)
    @total_count = scope.size
    @users = paginate(scope)
  end

  def show;end

  def update
    @user = User.find params[:id]
    @user.update!(user_params)
    render_ok
  end

  def me
    @user = current_user
  end

  # 贴吧获取用户信接口
  def get_user_info
    begin
      @user = current_user
      # TODO 等消息上线再打开注释
      #@tidding_count = unviewed_tiddings(current_user) if current_user.present?
      @course =
          if params[:course_id]
            Course.find params[:course_id]
          elsif params[:board_id]
            Board.find(params[:board_id]).course
          elsif params[:graduation_topic_id]
            GraduationTopic.find(params[:graduation_topic_id]).course
          elsif params[:graduation_group_id]
            GraduationGroup.find(params[:graduation_group_id]).course
          elsif params[:graduation_work_id]
            GraduationWork.find(params[:graduation_work_id]).course
          elsif params[:graduation_task_id]
            GraduationTask.find(params[:graduation_task_id]).course
          elsif params[:poll_id]
            Poll.find(params[:poll_id]).course
          elsif params[:attachment_id]
            Attachment.find(params[:attachment_id]).course
          end
      @course_identity = current_user.course_identity(@course) if @course
    rescue Exception => e
      uid_logger_error(e.message)
      missing_template
    end

  end

  def attachment_show
    file_name = params[:file_name]
    path = params[:path] || edu_setting('attachment_folder')
    send_file "#{path}/#{file_name}", :filename => "#{file_name}",
              :type => 'game',
              :disposition => 'attachment' #inline can open in browser
  end

  def html_show
    @contents = File.read("#{params[:path]}")
    respond_to do |format|
      format.html {render :layout => false}
    end
  end

  # Redo: 消息总数缓存
  def get_navigation_info
    @old_domain = edu_setting('old_edu_host')
    @user = current_user
    # 新消息数
    @new_message = @user.tidings.where("created_at > '#{@user.click_time}'").count > 0 || @user.private_messages.where("created_at > '#{@user.click_time}'").count > 0

    @user_url = "/users/#{@user.login}"
    @career = Career.where(status: true).order("created_at asc").pluck(:id, :name)
    @auth =  User.current.ec_school.present? ? "#{@old_domain}/ecs/department?school_id=#{User.current.ec_school}" : nil
  end

  # 用户回复功能
  def reply_message
    message = JournalsForMessage.new(reply_message_params)
    message.user_id = current_user.id
    message.save!

    render_ok(id: message.id)
  end

  # 搜索用户具有管理员角色的项目
  def search_user_projects
    projects = Project.where.not(status: 9)

    projects = projects.joins(members: :member_roles).where(member_roles: { role_id: 3 })
    projects = projects.where(members: { user_id: current_user.id })

    search = params[:search].to_s.strip
    projects = projects.where('projects.name LIKE ?', "%#{search}%") if search.present?

    @projects = projects.select(:id, :name)
  end

  # 个人主页信息
  def homepage_info;end

  def brief_introduction
    content = params[:content].to_s.strip

    current_user.user_extension.update!(brief_introduction: content)

    render_ok
  end

  def attendance
    attendance = Users::AttendanceService.call(current_user)
    render_ok(grade: current_user.grade, next_gold: attendance.next_gold)
  rescue Users::AttendanceService::Error => ex
    render_error(ex.message)
  end

  private
  def load_user
    @user = User.find_by_login(params[:id]) || User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:nickname, :lastname, :show_realname,
                                  user_extension_attributes: [
                                  :gender, :location, :location_city,
                                  :occupation, :technical_title,
                                  :school_id, :department_id]
                                )
  end

  def reply_message_params
    normal_status(-1, "参数不对") if params[:journals_for_message][:jour_type].nil? || params[:journals_for_message][:jour_id].nil? ||
        params[:journals_for_message][:notes].nil? || params[:journals_for_message][:reply_id].nil?
    params.require(:journals_for_message).permit(:jour_type, :jour_id, :notes, :m_parent_id, :reply_id)
  end

  def check_user_exist
    return if @user.present?
    render_not_found
  end

end
