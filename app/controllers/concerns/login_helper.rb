module LoginHelper
  extend ActiveSupport::Concern

  def edu_setting(name)
    EduSetting.get(name)
  end

  def autologin_cookie_name
    edu_setting('autologin_cookie_name').presence || 'autologin'
  end

  def set_autologin_cookie(user)
    token = Token.get_or_create_permanent_login_token(user, "autologin")
    sync_user_token_to_trustie(user.login, token.value)

    Rails.logger.info "###### def set_autologin_cookie and get_or_create_permanent_login_token result: #{token&.value}"
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
    # unless  cookies[autologin_cookie_name].present?
    #   cookies[autologin_cookie_name] = cookie_options
    # end
    cookies[autologin_cookie_name] = cookie_options

    # for action cable
    cookies.signed[:user_id] ||= user.id

    Rails.logger.info("cookies is #{cookies} ======> #{cookies.signed[:user_id]}")
  end

  def successful_authentication(user)
    Rails.logger.info("id: #{user&.id} Successful authentication start: '#{user.login}' from #{request.remote_ip} at #{Time.now.utc}")
    # Valid user
    self.logged_user = user
    session[:"#{default_yun_session}"] = user.id
    # generate a key and set cookie if autologin
    set_autologin_cookie(user)

    UserAction.create(action_id: user&.id, action_type: 'Login', user_id: user&.id, ip: request.remote_ip)
    user.update_column(:last_login_on, Time.now)
    # 注册完成后有一天的试用申请(先去掉)
    # UserDayCertification.create(user_id: user.id, status: 1)
  end

  def logout_user
    Rails.logger.info("####################__User.current_id______######{current_user.try(:id)}###___#{current_user&.logged?}")

    if User.current.logged?
      user = User.current
      autologin =
        if edu_setting('cookie_domain').present?
          cookies.delete(autologin_cookie_name, domain: edu_setting('cookie_domain'))
        else
           cookies.delete(autologin_cookie_name)
        end

      user.delete_autologin_token(autologin)
      user.delete_session_token(session[:tk])
      self.logged_user = nil
    end

    # 云上实验室退出清理当前session
    laboratory ||= (Laboratory.find_by_subdomain(request.subdomain) || Laboratory.find(1))
    default_yun_session = "#{laboratory.try(:identifier).split('.').first}_user_id"
    # end
    session[:"#{default_yun_session}"] = nil
  end

  # Sets the logged in user
  def logged_user=(user)
    reset_session
    if user && user.is_a?(User)
      Rails.logger.info("########________logged_user___________###########{user.id}")

      User.current = user
      start_user_session(user)
    else
      User.current = User.anonymous
    end
  end

  def start_user_session(user)
    # re_subdomain = "#{request.subdomain.split('.').first}_user_id"
    # session[:"#{request.subdomain}_user_id"] = user.id
    # Rails.logger.info("domain_user_id session is: 3333332222111#{session[:"#{request.subdomain}_user_id"]}")
    # Rails.logger.info("user_id session is: 3333332222111#{session[:"#{request.subdomain}_user_id"]}")
    #
    # # if current_laboratory.main_site?
    # #   session[:user_id] = user.id
    # # else
    # #   session[:"#{request.subdomain}_user_id"] = user.id
    # # end

    # session[:user_id] = user.id
    Rails.logger.info("########________start_user_session___________###########{user.id}")
    session[:"#{default_yun_session}"] = user.id
    session[:ctime] = Time.now.utc.to_i
    session[:atime] = Time.now.utc.to_i
  end

  def sync_pwd_to_gitea!(user, hash={})
    return true if user.is_sync_pwd?

    sync_params = { email: user.mail }
    interactor = Gitea::User::UpdateInteractor.call(user.login, sync_params.merge(hash))
    if interactor.success?
      Rails.logger.info "########_ login is #{user.login} sync_pwd_to_gitea success _########"
      true
    else
      Rails.logger.info "########_ login is #{user.login} sync_pwd_to_gitea fail!: #{interactor.error}"
      false
    end
  end

  # TODO 同步token到trustie平台，保持同步登录状态
  def sync_user_token_to_trustie(login, token_value)

    config = Rails.application.config_for(:configuration).symbolize_keys!

    token = config[:sync_token]
    api_host = config[:sync_url]

    return if api_host.blank?

    url = "#{api_host}/api/v1/users/sync_user_token"
    sync_json = {
      "token": token,
      "login": login,
      "user_token": token_value
    }
    uri = URI.parse(url)

    if api_host
      http = Net::HTTP.new(uri.hostname, uri.port)

      if api_host.include?("https://")
        http.use_ssl = true
      end

      http.send_request('POST', uri.path, sync_json.to_json, {'Content-Type' => 'application/json'})
    end

  end
end
