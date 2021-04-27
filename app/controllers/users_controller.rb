class UsersController < ApplicationController
  include ApplicationHelper
  include Ci::DbConnectable

  before_action :load_user, only: [:show, :homepage_info, :sync_token, :sync_gitea_pwd, :projects, :watch_users, :fan_users, :hovercard]
  before_action :check_user_exist, only: [:show, :homepage_info,:projects, :watch_users, :fan_users, :hovercard]
  before_action :require_login, only: %i[me list sync_user_info]
  before_action :connect_to_ci_db, only: [:get_user_info]
  skip_before_action :check_sign, only: [:attachment_show]

  def connect_to_ci_db(options={})
    if !(current_user && !current_user.is_a?(AnonymousUser) && current_user.devops_certification?)
      return
    end
    if current_user.ci_cloud_account.server_type == Ci::CloudAccount::SERVER_TYPE_TRUSTIE
      connect_to_trustie_ci_database(options)
    else
      connect_to_ci_database(options)
    end
  end

  def list
    scope = User.active.recent.like(params[:search]).includes(:user_extension)
    @total_count = scope.size
    @users = paginate(scope)
  end

  def show
      #待办事项，现在未做
      if User.current.login == @user.login 
        @waiting_applied_messages = @user.applied_messages.waiting
        @common_applied_transfer_projects = AppliedTransferProject.where(owner_id: @user.id).common + AppliedTransferProject.where(owner_id: Organization.joins(team_users: :team).where(team_users: {user_id: @user.id}, teams: {authorize: %w(admin owner)} )).common
        @undo_events = @waiting_applied_messages.size + @common_applied_transfer_projects.size
      else 
        @waiting_applied_messages = AppliedMessage.none
        @common_applied_transfer_projects = AppliedTransferProject.none
        @undo_events = 0
      end
      #用户的组织数量
      # @user_composes_count =  @user.composes.size
      @user_composes_count = 0
      user_organizations =  User.current.logged? ? @user.organizations.with_visibility(%w(common limited)) + @user.organizations.with_visibility("privacy").joins(:team_users).where(team_users: {user_id: current_user.id}) : @user.organizations.with_visibility("common")
      @user_org_count = user_organizations.size
      user_projects = User.current.logged? && (User.current.admin? ||  User.current.login == @user.login) ? @user.projects : @user.projects.visible
      @projects_common_count = user_projects.common.size
      @projects_mirrior_count = user_projects.mirror.size
      @projects_sync_mirrior_count = user_projects.sync_mirror.size
  end

  def watch_users
    watchers = Watcher.watching_users(@user.id).includes(:user).order("watchers.created_at desc")
    if params[:search].present?
      search_user_ids = User.where(id: watchers.pluck(:watchable_id)).like(params[:search]).pluck(:id)
      watchers = watchers.where(watchable_id: search_user_ids)
    end
    @watchers_count = watchers.size
    @watchers = paginate(watchers)
  end

  def fan_users
    watchers = @user.watchers.includes(:user).order("watchers.created_at desc")
    watchers = watchers.joins(:user).where("LOWER(concat(users.lastname, users.firstname, users.login)) LIKE ?", "%#{params[:search].split(" ").join('|')}%") if params[:search].present?

    @watchers_count = watchers.size
    @watchers = paginate(watchers)
  end

  def hovercard
  end

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
    rescue Exception => e
      uid_logger_error(e.message)
      missing_template
    end

  end

  def attachment_show
    file_name = params[:file_name]
    path = params[:path] || file_storage_directory
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
    # @old_domain = edu_setting('old_edu_host')
    # @user = current_user
    # # 新消息数
    # @new_message = @user.tidings.where("created_at > '#{@user.click_time}'").count > 0 || @user.private_messages.where("created_at > '#{@user.click_time}'").count > 0
    #
    # @user_url = "/users/#{@user.login}"
    # @career = Career.where(status: true).order("created_at asc").pluck(:id, :name)
    # @auth =  User.current.ec_school.present? ? "#{@old_domain}/ecs/department?school_id=#{User.current.ec_school}" : nil
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

  #TODO 个人主页信息，forge上弃用-hs, 0602
  def homepage_info
    #待办事项，现在未做
    @undo_events = 10
    #用户的组织数量
    # @user_composes_count =  @user.composes.size
    @user_composes_count = 10
  end

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

  # 其他平台登录后，必须将token同步到forge平台，实现sso登录功能
  def sync_token
    return render_error('未找相关用户!')  unless @user

    token = Token.get_or_create_permanent_login_token(@user, 'autologin')
    token.update_column(:value, params[:token])
    render_ok
  end

  def trustie_related_projects
    projects = Project.includes(:owner, :members, :project_score).where(id: params[:ids]).order("updated_on desc")
    projects_json = []
    domain_url = EduSetting.get('host_name') + '/projects'
    if projects.present?
      projects.each do |p|
        project_url = "/#{p.owner.login}/#{p.identifier}"
        pj = {
          id: p.id,
          name: p.name,
          is_public: p.is_public,
          updated_on: p.updated_on.strftime("%Y-%m-%d"),
          status: p.status,
          is_member: p.member?(current_user.try(:id)),
          owner: {
            name: p.owner.try(:show_real_name),
            login: p.owner.login
          },
          members_count: p&.members.size,
          issues_count: p.issues_count - p.pull_requests_count,
          commits_count: p&.project_score&.changeset_num.to_i,
          http_url: domain_url + project_url,
          http_collaborator_url: domain_url + project_url + "/setting/collaborator",
          http_issues_url: domain_url + project_url + "/issues",
          http_commits_url: domain_url + project_url + "/commits",
          project_score: p&.project_score.present? ? p&.project_score&.as_json(:except=>[:created_at, :updated_at]).merge!(commit_time: format_time(p&.project_score&.commit_time)) : {}
        }
        projects_json.push(pj)
      end
    end
    Rails.logger.info("==========projects_json========+########{projects_json}")
    render json: { projects: projects_json.present? ? projects_json : {} }
  end

  def trustie_projects
    user_id = User.select(:id, :login).where(login: params[:login])&.first&.id
    projects = Project.visible

    projects = projects.joins(:members).where(members: { user_id: user_id })

    search = params[:search].to_s.strip
    projects = projects.where('projects.name LIKE ?', "%#{search}%") if search.present?

    projects = projects.select(:id, :name).limit(10).as_json
    render json: { projects: projects }
  end

  def projects
    is_current_admin_user = User.current.logged? && (current_user&.admin? || current_user.id == @user.id)
    scope = Projects::ListMyQuery.call(params, @user,is_current_admin_user)
    @total_count = scope.size
    @projects = paginate(scope)
  end

  # TODO 其他平台登录时同步修改gitea平台对应用户的密码
  # 该方法主要用于：别的平台初次部署对接forge平台，同步用户后，gitea平台对应的用户密码与forge平台用户密码不一致是问题
  def sync_gitea_pwd
    return render_error("未找到相关的用户") if @user.blank?

    flag = sync_pwd_to_gitea!(@user, {password: params[:password].to_s})
    flag ? render_ok : render_error('同步失败!')
  end

  # TODO
  # 同步trusite平台用户的salt信息，只需同步一次，同步完成后，该方法可以删除
  def sync_salt
    user = User.find_by_login params[:login]
    return if user.blank?
    user.update_column(:salt, params[:salt])
    render_ok
  end

  def sync_user_info
    user = User.find_by_login params[:login]
    return render_forbidden unless user === current_user

    sync_params = {
      email: params[:email],
      password: params[:password]
    }

    Users::UpdateInfoForm.new(sync_params.merge(login: params[:login])).validate!

    interactor = Gitea::User::UpdateInteractor.call(user.login, sync_params)
    if interactor.success?
      user.update!(password: params[:password], mail: params[:email], status: User::STATUS_EDIT_INFO)
      render_ok
    else
      render_error(interactor.error)
    end
  end

  private
  def load_user
    @user = User.find_by_login(params[:id]) || User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:nickname, :lastname, :show_realname,:login,:mail,
                                  user_extension_attributes: [
                                  :gender, :location, :location_city,
                                  :occupation, :technical_title,
                                  :school_id, :department_id,:identity, :student_id, :description]
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
