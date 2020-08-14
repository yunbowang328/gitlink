module RegisterHelper
  extend ActiveSupport::Concern

  def autologin_register(username, email, password, platform= '')
    result = {message: nil, user: nil}

    user = User.new(admin: false, login: username, mail: email, type: "User")
    user.password = password
    user.platform = platform
    user.activate

    interactor = Gitea::RegisterInteractor.call({username: username, email: email, password: password})
    if interactor.success?
      gitea_user = interactor.result
      result = Gitea::User::GenerateTokenService.new(username, password).call
      user.gitea_token = result['sha1']
      user.gitea_uid = gitea_user['id']
      if user.save!
        UserExtension.create!(user_id: user.id)
        result[:user] = {id: user.id, token: user.gitea_token}
      end
    else
      result[:message] = interactor.error
    end
    result
  end

end
