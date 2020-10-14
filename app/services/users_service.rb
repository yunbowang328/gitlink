#coding=utf-8
class UsersService
  include ApplicationHelper
  # include AccountHelper
  # include AvatarHelper
  include ApiHelper
  # include WordsHelper
  include ApiIndexHelper
  #将用户注册的功能函数写这里
  #参数约定
  #成功返回注册后的User实例，失败直接抛异常

  # 生成邀请码
  CODES = %W(0 1 2 3 4 5 6 7 8 9)
  def generate_user_login type
    code = CODES.sample(8).join
    code = type + code.to_s
    return generate_user_login(type) if User.where(login: code).present?
    code
  end

  def edit_brief params, current_user 
    target_user = User.find(params[:login])
    return {status: -1, message: "请输入内容"} if params[:content].blank?
    return {status: -1, message: "请登录"} unless current_user.present?
    return {status: -1, message: "您没有权限操作"} unless current_user.login == params[:login]
    user_extent = target_user.user_extension
    user_extent.brief_introduction = params[:content].first(20)
    if user_extent.save 
      {status: 0, message: "更新成功"}
    else
      {status: -1, message: user_extent.errors.messages.values[0]}
    end

  end

  def user_info params, current_user
    target_user = User.find_by(login: params[:login])
    return {status: 404, message: "用户不存在"} unless target_user.present?
    format_common_user = format_common_user(target_user)
    target_user_info = {
      current_login: current_user&.login,
      fans_count: target_user&.watcher_users.size,
      stars_count:  User.watched_by(target_user.id).size,
      identify: target_user.identity,
      authentication: target_user.authentication,
      professional: target_user.professional_certification,
      bind_phone: target_user.phone.present?,
      bind_email: target_user.mail.present?,
      brief: target_user&.user_extension&.brief_introduction,
      is_current_user: current_user&.login == params[:login],
      is_watched: target_user.watched_by?(current_user),
      is_blocked: current_user&.blocked_for(target_user.id),
      is_blocked_by: target_user&.blocked_for(current_user.id),
      # identify_status: target_user&.get_auth_status("1"),
      # profession_status: target_user&.get_auth_status("2"),
    }.merge(format_common_user)

    {status: 0, user: target_user_info}
  end

  def block_user_lists params, current_user
    return {status: -1, message: "请登录"} unless current_user.present?
    return {status: -1, message: "您没有权限操作"} unless current_user.login == params[:login]
    user_block_ids = current_user.block_users.pluck(:block_user_id).uniq
    block_users_size = user_block_ids.size
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0
    limit = params[:limit] || 30
    offset = page * limit.to_i
    
    block_users =User.where(id: user_block_ids).limit(limit).offset(offset)
    block_lists = []
    block_users.each do |user|
      if user.present?
        
        block_lists.push({
          username: user.show_name, 
          login: user.login,
          image_url: "/images/#{url_to_avatar(user)}?#{Time.now.to_i}",
          brief: user&.user_extension.try(:brief_introduction)
        })
      end
    end
    {status: 0, users_size: block_users_size, users: block_lists}
  end

  def block_user params, current_user
    target_user = User.find(params[:login])
    return {status: -1, message: "请选择屏蔽类型"} unless params[:block].present?
    return {status: -1, message: "请登录"} unless current_user.present?
    return {status: -1, message: "用户不存在"} unless target_user.present?
    if params[:block].to_s == "block"
      Watcher.is_watcher_user.between_user(target_user.id, current_user.id).destroy_all
      if current_user&.block_users.block_user_present(target_user.id).exists?
        return {status: 0, message: "已加入黑名单"}
      else
        BlockUser.create(user_id: current_user&.id, block_user_id: target_user.id)
        return {status: 0, message: "已加入黑名单"}
      end
    else
      current_user&.block_users.block_user_present(target_user.id).destroy_all 
      return {status: 0, message: "已移出黑名单"}
    end
  end

  def watch_user params, current_user
    target_user = User.find(params[:login])
    return {status: -1, message: "请选择关注类型"} unless params[:watch].present?
    return {status: -1, message: "请登录"} unless current_user.try(:login).present?
    return {status: -1, message: "用户不存在"} unless target_user.present?
    return {status: -1, message: "根据对方设置，不可关注"} if target_user&.blocked_for(current_user.id)
    if params[:watch].to_s == "watch"
      if target_user.watched_by?(current_user)
        return {status: 0, message: "已关注"}
      else
        target_user.add_watcher(current_user)
        # current_user.watch!(target_user)
        return {status: 0, message: "已关注"}
      end
    else
      target_user.remove_watcher(current_user)
      # current_user.unwatch!(target_user)
      return {status: 0, message: "已取消关注"}
    end
  end

  def user_projects params, current_user
    return {status: -1, message: "请登录"} unless current_user.present?
    target_user = User.find(params[:login])
    show_all = params[:login] == current_user&.login || current_user&.admin?
    select_type = params[:type] || "p_project"  
    order = params[:order] || "desc"
    p_type = params[:p] || "a"
    status = p_type == "a" ? "(0,1)" : "("+p_type+")"
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0
    limit = params[:limit] || 16
    offset = page * limit.to_i
    is_current_user = params[:login] == current_user&.login
    
    case select_type
      when "l_projects"
        project_ids = Project.find_by_sql("SELECT p.id FROM projects p, members m, member_roles mr WHERE m.project_id = p.id AND m.id=mr.member_id AND mr.role_id in (4, 5) AND m.user_id=#{target_user.id} AND p.status != 9 AND p.is_public in #{status}").map(&:id)
        
        projects = Project.where(:id => project_ids).includes(:project_score, owner: :user_extension).order("updated_on #{order}")
      when "p_projects"
        project_ids = Project.find_by_sql("SELECT p.id FROM projects p, members m, member_roles mr WHERE m.project_id = p.id AND m.id=mr.member_id AND mr.role_id = 3 AND m.user_id=#{target_user.id} AND p.status != 9 AND p.is_public in #{status}").map(&:id)
        projects = Project.where(:id => project_ids).includes(:project_score, owner: :user_extension).order("updated_on #{order}")
    end
    projects_size = project_ids.size
    projects = projects.limit(limit).offset(offset)

    project_list_arrays = []
    projects.each do |p|
      project_user = format_common_user(p.owner)
      owner_school = p.owner&.school_name

      project_list_arrays.push({
        id: p.id, 
        name: p.name, 
        is_public: p.is_public,
        issues_count: p.issue_count,
        members_count: p.member_count,
        commits_count: p&.project_score.try(:changeset_num).to_i,
        identifier: p.identifier,
        school_name: owner_school
      }.merge(project_user))
    end

    {status: 0,is_current_user: is_current_user, projects_size: projects_size, projects: project_list_arrays}
  end

  def get_user_info params, current_user
    if current_user.present? && (current_user.id != 2)
      status = 0
    else
      status = -1
    end
    current_user_info = format_for_current_user current_user
    {status: status, current_user: current_user_info}
  end

  # 关注
  def watch params, current_user
    s = WatchesService.new
    s.watch params.merge(:current_user_id => current_user.id)
    return {:status => 1, :message => "success"}
  end

  # 取消关注
  def unwatch params, current_user
    s = WatchesService.new
    s.unwatch params.merge(:current_user_id => current_user.id)
    return {:status => 1, :message => "success"}
  end

  def register(params)
    @user = User.new
    @user.admin = false
    @user.register
    @user.login = generate_user_login params[:mail] ? 'm' : (params[:phone] ? 'p' : 'w')
    @user.mail = params[:mail]
    @user.phone = params[:phone]
    password = params[:password] || params[:mail_password]
    password_confirmation = params[:password] || params[:mail_password]
    should_confirmation_password = params[:should_confirmation_password]
    if !password.blank? && !password_confirmation.blank? && should_confirmation_password
      @user.password, @user.password_confirmation = password, password_confirmation
    elsif !password.blank? && !should_confirmation_password
      @user.password = password
    else
      @user.password = ""
    end
    if params[:mail]
      case Setting.self_registration
        when '1'
          @user = email_activation_register(@user)
        when '3'
          @user = automatically_register(@user)
        else
          @user = administrator_manually__register(@user)
      end
    else
      @user = automatically_register(@user)
    end
    if @user.id != nil
      ue = @user.user_extension ||= UserExtensions.new
      ue.user_id = @user.id
      ue.save
      if params[:entity_type]
        entity = Entity.new
        entity.user_id = @user.id
        entity.entity_type = params[:entity_type].to_i
        entity.save!
      end
    end
    @user
    #img_url = url_to_avatar(@user)
    #gender = @user.user_extension.gender.nil? ? 0 : @user.user_extension.gender
    #work_unit = get_user_work_unit @user
    #location = get_user_location @user
    #{:id => @user.id, :img_url => img_url, :nickname => @user.login, :gender => gender, :work_unit => work_unit, :mail => @user.mail, :location => location, :brief_introduction => @user.user_extension.brief_introduction}
  end

  # 自动注册功能 FOR：邮件邀请
  def register_auto(login, mail, password, first_name, last_name, gender)
    mail_notification = "day"
    @user = User.new
    @user.admin = false
    @user.register
    @user.login = login
    @user.mail = mail
    @user.firstname = first_name
    @user.lastname = last_name
    @user.mail_notification = mail_notification
    password_confirmation = password
    should_confirmation_password = true
    if !password.blank? && !password_confirmation.blank? && should_confirmation_password
      @user.password, @user.password_confirmation = password, password_confirmation
    elsif !password.blank? && !should_confirmation_password
      @user.password = password
    else
      @user.password = ""
    end
    @user = automatically_register_lock(@user)
    if @user.id != nil
      ue = @user.user_extension ||= UserExtensions.new
      ue.gender = gender
      ue.user_id = @user.id
      ue.save
    end
    @user
  end

  #显示用户
  #id用户id
  def show_user(params)
    @user = User.find(params[:id])
    img_url = "/images/"+url_to_avatar(@user)
    gender = @user.user_extension.gender.nil? ? 0 : @user.user_extension.gender
    work_unit = get_user_work_unit @user
    location = get_user_location @user
    {:id => @user.id, :img_url => img_url,:realname => @user.realname, :nickname => @user.nickname, :gender => gender, :work_unit => work_unit, :mail => @user.mail, :location => location, :brief_introduction => @user.user_extension.brief_introduction}
  end

  #忘记密码
  def lost_password params
    user = ::User.find_by_mail(params[:mail].to_s)
    # user not found or not active
    unless user && user.active?
      raise l(:notice_account_unknown_email,:locale => 'zh')
    end
    # user cannot change its password
    unless user.change_password_allowed?
      raise l(:notice_can_t_change_password,:locale => user.language)
      return
    end
    # create a new token for password recovery
    token = Token.new(:user => user, :action => "recovery")
    if token.save
      Mailer.run.lost_password(token)
      return l(:notice_account_lost_email_sent,:locale => user.language)
    end
  end

  #编辑用户
  #gender 1：female 0：male 其他：male
  def edit_user params
    @user = User.find(params[:id])
    fileio = params[:file]

    # @se = @user.extensions
    # if @user.user_extension.identity == 0 || @user.user_extension.identity == 1
    #   @se.school_id = params[:occupation]
    # elsif @user.user_extension.identity == 3
    #   @se.occupation = params[:occupation]
    # elsif @user.user_extension.identity == 2
    #   @user.firstname = params[:occupation]
    # end
    # @se.brief_introduction = params[:brief_introduction]
    # @se.gender = params[:gender]
    # @se.location = params[:province] if params[:province]
    # @se.location_city = params[:city] if params[:city]
    # raise @se.errors.full_message unless @se.save
    unless  fileio.nil?
      file = fileio[:tempfile]
      diskfile=disk_filename(@user.class.to_s, @user.id)
      @image_file = fileio[:name]
      @urlfile='/' << File.join("images", "avatars", avatar_directory(@user.class.to_s), avatar_filename(@user.id, @image_file))

      path = File.dirname(diskfile)
      unless File.directory?(path)
        FileUtils.mkdir_p(path)
      end
      File.rename(file.path, @urlfile)
      begin
        f = Magick::ImageList.new(diskfile)
        # gif格式不再做大小处理
        if f.format != 'GIF'
          width = 300.0
          proportion = (width/f[0].columns)
          height = (f[0].rows*proportion)
          f.resize_to_fill!(width, height)
          f.write(diskfile)
        end

      rescue Exception => e
        logger.error "[Error] avatar : users_service#edit_user ===> #{e}"
      end
    end
    #img_url = url_to_avatar(@user)
    #gender = @user.user_extension.gender.nil? ? 0 : @user.user_extension.gender
    #work_unit = get_user_work_unit @user
    #location = get_user_location @user
    #{:id => @user.id, :img_url => img_url, :nickname => @user.login, :gender => gender, :work_unit => work_unit, :mail => @user.mail, :location => location, :brief_introduction => @user.user_extension.brief_introduction}
    @user
  end

  # 获取某个用户的所有留言信息
  def get_all_messages params
    user = User.find(params[:user_id])
    jours = user.journals_for_messages.where('m_parent_id IS NULL').order('created_on DESC').page(params[:page] || 1).per(10)
    jours.update_all(:is_readed => true, :status => false)
    jours.each do |journal|
      fetch_user_leaveWord_reply(journal).update_all(:is_readed => true, :status => false)
    end
    jours
  end

  # 回复用户
  def reply_user_messages params,current_user
    user = User.find(params[:user_id])

    m_parent_id = params[:parent_id]
    author_id = current_user.id
    reply_id = params[:ref_user_id]
    ref_message_id = params[:ref_message_id]
    content = params[:content]
    options = {:user_id => author_id,  # 作者id
               :status => true,
               :m_parent_id => m_parent_id,# 父留言id
               :m_reply_id => ref_message_id,  # 子留言 id
               :reply_id => reply_id, # 被留言用户id
               :notes => content,
               :is_readed => false}
    if(params[:type] == 1)
        user.add_jour(nil, nil,nil,options)
    elsif(params[:type] == 2)
        Course.find(params[:course_id]).journals_for_messages.build(options).save! unless params[:course_id].nil?
    else
    end

  end

  # 给用户留言
  def leave_message params,current_user
        obj = User.find(params[:user_id]).add_jour(current_user, params[:content], 0)
        obj
  end


  #关注列表
  def user_watcher params
    @user = User.find(params[:id])
    User.watched_by(@user.id)
  end

  #用户课程列表
  def user_courses_list params,current_user
    @user = User.find(params[:id])
    if !current_user.admin? && !@user.active?
        raise '404'
        return
    end
    if current_user == @user || current_user.admin?
      membership = @user.coursememberships.all
    else
      membership = @user.coursememberships.all(:conditions => Course.visible_condition(current_user))
    end
    membership.sort! {|older, newer| newer.created_on <=> older.created_on }
    course_list = []
    membership.each do |mp|
      course_list << {:course => mp.course,:img_url => "/images/"+url_to_avatar(mp.course),:current_user_is_member => current_user.member_of_course?(mp.course),:current_user_is_teacher => is_course_teacher(current_user,mp.course)}
    end
    course_list
  end

  #修改密码
  def change_password params
    ActiveRecord::Base.transaction do
      @current_user =  User.find(params[:current_user_id])
      if @current_user.check_password?(params[:password])
        @current_user.password, @current_user.password_confirmation = params[:new_password], params[:new_password_confirmation]
        @current_user.save
        # 修改密码同步gitlab密码修改
        unless @current_user.gid.nil?
          begin
            g = Gitlab.client
            g.edit_user(@current_user.gid, :password => params[:new_password])
          rescue Exception => e
            logger.error "change users password failed! ===> #{e}"
          end
        end
        #raise @current_user.errors.full_message
        #return @current_user
      else
        if params[:password].present?
          raise l(:notice_account_wrong_password,:locale => 'zh')
        else
          if params[:new_password].strip != "" && params[:new_password_confirmation].strip != ""
            @current_user.password, @current_user.password_confirmation = params[:new_password], params[:new_password_confirmation]
            @current_user.save
            unless @current_user.gid.nil?
              begin
                g = Gitlab.client
                g.edit_user(@current_user.gid, :password => params[:new_password])
              rescue Exception => e
                logger.error "change users password failed! ===> #{e}"
              end
            end
          end
        end
      end
      @current_user
    end
  end

  #搜索用户
  def search_user params
    status = params[:status] || 1
    has = {
        "show_changesets" => true
    }
    scope = User.logged.status(status)
    search_by = params[:search_by] ? params[:search_by] : "0"
    if params[:is_search_assitant].nil?
      #modify by yutao 2015/5/18 没有params[:user_id]参数时去掉"id not in (?)"条件(bug:#2270) start
      #say by yutao: params[:user_id]这个是指谁发起的搜索么? 如果是 这个值貌似应该从session获取 怪怪的赶脚-_-!
      if params[:name].present?
        if !params[:user_id].nil?
          watcher = User.watched_by(params[:user_id])
          watcher.push(params[:user_id])
          scope = scope.where("id not in (?)",watcher)
        end
        #scope = scope.like(params[:name],search_by)
        scope = scope.where("( LOWER(login) LIKE ? or LOWER(concat(lastname, firstname)) LIKE ? or LOWER(mail) LIKE ? )",
                            "%#{params[:name]}%","%#{params[:name]}%","%#{params[:name]}%")
      end
      #modify by yutao 2015/5/18 没有params[:user_id]参数时去掉"id not in (?)"条件 end
    else
      teachers = searchTeacherAndAssistant(Course.find(params[:course_id]))
      scope = scope.where("id not in (?)",teachers.map{|t| t.user_id}).like(params[:name],search_by) if params[:name].present?
    end
    scope
  end

  # 课程留言中与我相关的回复
  def my_course_messages params,current_user
    #找到我所有的课程
    @user = current_user
    if !current_user.admin? && !@user.active?
      raise '404'
      return
    end
    if current_user == @user || current_user.admin?
      membership = @user.coursememberships.all
    end
    # membership.sort! {|older, newer| newer.created_on <=> older.created_on }
    message_list = []
    membership.each do |mp|
      #课程轮询找到与我相关的回复
      message_list << mp.course.journals_for_messages.where("reply_id = ?",current_user.id)
    end
    message_list
  end

  # 获取与我相关的留言：我的留言，回复我的留言
  def my_personal_messages params,current_user
    jours = current_user.journals_for_messages.where('m_parent_id is null or reply_id = ?',current_user.id)
    jours.update_all(:is_readed => true, :status => false)
    jours
  end

  # 所有的与我相关
  def reply_my_messages params,current_user
    jours = my_personal_messages params,current_user
    jours1 = my_course_messages params,current_user
    my_jours = []
    my_jours << jours << jours1
    my_jours.flatten!.sort! {|older, newer| newer.created_on <=> older.created_on }
    my_jours_arr = Kaminari.paginate_array(my_jours, total_count: my_jours.count).page(params[:page] || 1).per(10)
    my_jours_arr
  end

  def wechat_unbind uw
    user = uw.user

    #发重新绑定的微信模版消息

    type = "login"
    title = "尊敬的用户，您已解除绑定。"
    key1 = "个人原因"
    remark = "点击进入重新绑定。"

    ws = WechatService.new
    ws.rebind_notice user.id, type, user.id, title, key1,format_time(Time.now), remark

    uw.user_id = nil
    uw.delete

  end

end
