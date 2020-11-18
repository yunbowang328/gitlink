class AccountsController < ApplicationController

  #skip_before_action :check_account, :only => [:logout]

  def index
    render json: session
  end

  # 其他平台同步注册的用户
  def remote_register
    username = params[:username]&.gsub(/\s+/, "")
    email = params[:email]&.gsub(/\s+/, "")
    password = params[:password]
    platform = (params[:platform] || 'forge')&.gsub(/\s+/, "")

    ActiveRecord::Base.transaction do
      result = autologin_register(username, email, password, platform)
      if result[:message].blank?
        render_ok({user: result[:user]})
      else
        render_error(result[:message])
      end
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(-1, e.message)
  end

  # 其他平台修改用户的信息，这边同步修改
  def remote_update
    ActiveRecord::Base.transaction do
      user_params = params[:user_params]
      user_extension_params = params[:user_extension_params]

      u = User.find_by(login: params[:old_user_login])
      user_mail = u.try(:mail)

      if u.present?
        ue = u.user_extension
        u.login = user_params["login"] if user_params["login"]
        u.mail = user_params["mail"] if user_params["mail"]
        u.lastname = user_params["lastname"] if user_params["lastname"]

        ue.gender = user_extension_params["gender"]
        ue.school_id = user_extension_params["school_id"]
        ue.location = user_extension_params["location"]
        ue.location_city = user_extension_params["location_city"]
        ue.identity = user_extension_params["identity"]
        ue.technical_title = user_extension_params["technical_title"]
        ue.student_id = user_extension_params["student_id"]
        ue.description = user_extension_params["description"]
        ue.save!
        u.save!

        sync_params = {}

        if (user_params["mail"] && user_params["mail"] != user_mail)
          sync_params = sync_params.merge(email: user_params["mail"])
        end

        if sync_params.present?
          interactor = Gitea::User::UpdateInteractor.call(u.login, sync_params)
          if interactor.success?
            render_ok
          else
            render_error(interactor.error)
          end
        end
      end
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(-1, e.message)
  end

  # 其他平台同步登录
  def remote_login
    @user = User.try_to_login(params[:login], params[:password])
    if @user
      successful_authentication(@user)
      render_ok({user: {id: @user.id, token: @user.gitea_token}})
    else
      render_error("用户不存在")
    end
  end

  #修改密码
  def remote_password
    @user = User.find_by(login: params[:login])
    return render_error("未找到相关用户!") if @user.blank?

    sync_params = {
      password: params[:password].to_s,
      email: @user.mail
    }

    interactor = Gitea::User::UpdateInteractor.call(@user.login, sync_params)
    if interactor.success?
      @user.update_attribute(:password, params[:password])
      render_ok
    else
      render_error(interactor.error)
    end
  end



  # 用户注册
  # 注意：用户注册需要兼顾本地版，本地版是不需要验证码及激活码以及使用授权的，注册完成即可使用
  # params[:login] 邮箱或者手机号
  # params[:code]  验证码
  # code_type 1：注册手机验证码  8：邮箱注册验证码
  def register
    begin
      # 查询验证码是否正确;type只可能是1或者8
      type = phone_mail_type(params[:login].strip)
      code = params[:code].strip

      if type == 1
        uid_logger("start register by phone:  type is #{type}")
        pre = 'p'
        email = nil
        phone = params[:login]
        # verifi_code = VerificationCode.where(phone: phone, code: code, code_type: 1).last
        # TODO: 暂时限定邮箱注册
        return normal_status(-1, '只支持邮箱注册')
      else
        uid_logger("start register by email:  type is #{type}")
        pre = 'm'
        email = params[:login]
        phone = nil
        verifi_code = VerificationCode.where(email: email, code: code, code_type: 8).last
      end
      uid_logger("start register:  verifi_code is #{verifi_code}, code is #{code}, time is #{Time.now.to_i - verifi_code.try(:created_at).to_i}")
      # check_code = (verifi_code.try(:code) == code.strip && (Time.now.to_i - verifi_code.created_at.to_i) <= 10*60)
      # todo 上线前请删除万能验证码"513231"
      return normal_status(-1, "该邮箱已注册") if User.exists?(mail: params[:login])
      return normal_status(-1, "邮箱格式错误") unless params[:login] =~ CustomRegexp::EMAIL
      return normal_status(-1, "8~16位密码，支持字母数字和符号") unless params[:password] =~ CustomRegexp::PASSWORD

      code = generate_identifier User, 8, pre
      login = pre + code
      @user = User.new(admin: false, login: login, mail: email, phone: phone, type: "User")
      @user.password = params[:password]
      # 现在因为是验证码，所以在注册的时候就可以激活
      @user.activate
      # 必须要用save操作，密码的保存是在users中
      if @user.save!
        # todo user_extension
        UserExtension.create!(user_id: @user.id)
        # 注册完成，手机号或邮箱想可以奖励500金币
        # RewardGradeService.call(
        #   @user,
        #   container_id: @user.id,
        #   container_type: pre == 'p' ? 'Phone' : 'Mail',
        #   score: 500
        # )
        # 注册时，记录是否是引流用户
        ip = request.remote_ip
        ua = UserAgent.find_by_ip(ip)
        ua.update_column(:agent_type, UserAgent::USER_REGISTER) if ua
        successful_authentication(@user)
        # session[:user_id] = @user.id
        normal_status("注册成功")
      end
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(-1, e.message)
    end
  end

  # 用户登录
  def login
    @user = User.try_to_login(params[:login], params[:password])

    return normal_status(-2, "错误的账号或密码") if @user.blank?
    # user is already in local database
    return normal_status(-2, "违反平台使用规范，账号已被锁定") if @user.locked?

    login_control = LimitForbidControl::UserLogin.new(@user)
    return normal_status(-2, "登录密码出错已达上限，账号已被锁定, 请#{login_control.forbid_expires/60}分钟后重新登录或找回密码") if login_control.forbid?

    password_ok = @user.check_password?(params[:password].to_s)
    unless password_ok
      if login_control.remain_times-1 == 0
        normal_status(-2, "登录密码出错已达上限，账号已被锁定, 请#{login_control.forbid_expires/60}分钟后重新登录或找回密码")
      else
        normal_status(-2, "你已经输错密码#{login_control.error_times+1}次，还剩余#{login_control.remain_times-1}次机会")
      end
      login_control.increment!
      return
    end

    successful_authentication(@user)
    sync_pwd_to_gitea!(@user, {password: params[:password].to_s}) # TODO用户密码未同步

    # session[:user_id] = @user.id
  end

  # 忘记密码
  def reset_password
    begin
      code = params[:code]
      login_type = phone_mail_type(params[:login].strip)
      # 获取验证码
      if login_type == 1
        phone = params[:login]
        verifi_code = VerificationCode.where(phone: phone, code: code, code_type: 2).last
        user = User.find_by_phone(phone)
      else
        email = params[:login]
        verifi_code = VerificationCode.where(email: email, code: code, code_type: 3).last
        user = User.find_by_mail(email)     #这里有问题，应该是为email,而不是mail  6.13-hs
      end
      return normal_status(-2, "验证码不正确") if verifi_code.try(:code) != code.strip
      return normal_status(-2, "验证码已失效") if !verifi_code&.effective?
      return normal_status(-1, "8~16位密码，支持字母数字和符号") unless params[:new_password] =~ CustomRegexp::PASSWORD

      user.password, user.password_confirmation = params[:new_password], params[:new_password_confirmation]
      ActiveRecord::Base.transaction do
        user.save!
        LimitForbidControl::UserLogin.new(user).clear
      end
      sucess_status
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
    end
  end

  def  successful_authentication(user)
    uid_logger("Successful authentication start: '#{user.login}' from #{request.remote_ip} at #{Time.now.utc}")
    # Valid user
    self.logged_user = user
    # generate a key and set cookie if autologin

    set_autologin_cookie(user)
    UserAction.create(:action_id => user.try(:id), :action_type => "Login", :user_id => user.try(:id), :ip => request.remote_ip)
    user.update_column(:last_login_on, Time.now)
    session[:"#{default_yun_session}"] = user.id
    Rails.logger.info("#########_____session_default_yun_session__________###############{default_yun_session}")
    # 注册完成后有一天的试用申请(先去掉)
    # UserDayCertification.create(user_id: user.id, status: 1)
  end

  def set_autologin_cookie(user)
    token = Token.get_or_create_permanent_login_token(user, "autologin")
    sync_user_token_to_trustie(user.login, token.value)

    cookie_options = {
                      :value => token.value,
                      :expires => 1.month.from_now,
                      :path => '/',
                      :secure => false,
                      :httponly => true
                     }
    if edu_setting('cookie_domain').present?
      cookie_options = cookie_options.merge(domain: edu_setting('cookie_domain'))
    end
    cookies[autologin_cookie_name] = cookie_options
    cookies.signed[:user_id] ||= user.id

    logger.info("cookies is #{cookies} ======> #{cookies.signed[:user_id]} =====> #{cookies[autologin_cookie_name]}")
  end

  def logout
    Rails.logger.info("########___logout_current_user____________########{current_user.try(:id)}")
    UserAction.create(action_id: User.current.id, action_type: "Logout", user_id: User.current.id, :ip => request.remote_ip)
    logout_user
    render :json => {status: 1, message: "退出成功!"}
  end

  # 检验邮箱是否已被注册及邮箱或者手机号是否合法
  # 参数type为事件类型 1：注册；2：忘记密码；3：绑定
  def valid_email_and_phone
    check_mail_and_phone_valid(params[:login], params[:type])
  end

  # 发送验证码
  # params[:login]  手机号或者邮箱号
  # params[:type]为事件通知类型 1：用户注册注册 2：忘记密码 3: 绑定手机 4: 绑定邮箱, 5: 验收手机号有效 # 如果有新的继续后面加
  # 发送验证码：send_type 1：注册手机验证码 2：找回密码手机验证码 3：找回密码邮箱验证码 4：绑定手机 5：绑定邮箱
  # 6：手机验证码登录 7：邮箱验证码登录 8：邮箱注册验证码 9: 验收手机号有效
  def get_verification_code
    code = %W(0 1 2 3 4 5 6 7 8 9)
    value = params[:login]
    type = params[:type].strip.to_i
    login_type = phone_mail_type(value)
    send_type = verify_type(login_type, type)
    verification_code = code.sample(6).join

    sign = Digest::MD5.hexdigest("#{OPENKEY}#{value}")
    tip_exception(501, "请求不合理") if sign != params[:smscode]

    logger.info("########get_verification_code: login_type： #{login_type}， send_type：#{send_type}, ")

    # 记录验证码
    check_verification_code(verification_code, send_type, value)
    sucess_status
  end

  # 1 手机类型；0 邮箱类型
  # 注意新版的login是自动名生成的
  def phone_mail_type value
    value =~ /^1\d{10}$/ ? 1 : 0
  end

  private

  # type 事件类型 1：用户注册 2：忘记密码 3: 绑定手机 4: 绑定邮箱, 5: 验证手机号是否有效 # 如果有新的继续后面加
  # login_type 1：手机类型 2：邮箱类型
  def verify_type login_type, type
    case type
    when 1
      login_type == 1 ? 1 : 8
    when 2
      login_type == 1 ? 2 : 3
    when 3
      login_type == 1 ? 4 : tip_exception('请填写正确的手机号')
    when 4
      login_type == 1 ? tip_exception('请填写正确的邮箱') : 5
    when 5
      login_type == 1 ? 9 : tip_exception('请填写正确的手机号')
    end
  end

  def generate_login(login)
    type = phone_mail_type(login.strip)

    if type == 1
      uid_logger("start register by phone:  type is #{type}")
      pre = 'p'
      email = nil
      phone = login
    else
      uid_logger("start register by email:  type is #{type}")
      pre = 'm'
      email = login
      phone = nil
    end
    code = generate_identifier User, 8, pre

    { login: pre + code, email: email, phone: phone }
  end

  def user_params
    params.require(:user).permit(:login, :email, :phone)
  end

end
