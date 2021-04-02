module RegisterHelper
  extend ActiveSupport::Concern

  def autologin_register(username, email, password, platform= 'forge', need_edit_info = false)
    result = {message: nil, user: nil}

    user = User.new(admin: false, login: username, mail: email, type: "User")
    user.password = password
    user.platform = platform
    if need_edit_info
      user.need_edit_info
    else 
      user.activate
    end
    
    return unless user.valid?

    interactor = Gitea::RegisterInteractor.call({username: username, email: email, password: password})
    if interactor.success?
      gitea_user = interactor.result
      result = Gitea::User::GenerateTokenService.call(username, password)
      user.gitea_token = result['sha1']
      user.gitea_uid = gitea_user[:body]['id']
      if user.save!
        UserExtension.create!(user_id: user.id)
        result[:user] = {id: user.id, token: user.gitea_token}
      end
    else
      result[:message] = interactor.error
    end
    result
  end

  def autosync_register_trustie(username, password, email)
    config = Rails.application.config_for(:configuration).symbolize_keys!

    api_host = config[:sync_url]

    return if api_host.blank?

    url = "#{api_host}/api/v1/users"
    sync_json = {
      "mail": email,
      "password": password,
      "login": username
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
