module RegisterHelper
  extend ActiveSupport::Concern

  def autologin_register(username, email, password, platform= 'forge')
    user = User.new(admin: false, login: username, mail: email, type: "User")
    user.password = password
    user.platform = platform
    user.activate
    
    return unless user.valid?

    create_gitea_user!(user, username, email, password)
  end

  def create_gitea_user!(forge_user, username, email, password=random_password)
    result = {message: nil, user: nil}

    interactor = Gitea::RegisterInteractor.call({username: username, email: email, password: password})
    if interactor.success?
      gitea_user = interactor.result
      result = Gitea::User::GenerateTokenService.call(username, password)
      forge_user.gitea_token = result['sha1']
      forge_user.gitea_uid = gitea_user[:body]['id']
      forge_user.mail = email
      if forge_user.save
        UserExtension.create!(user_id: forge_user.id) unless forge_user.user_extension.blank?
        result[:user] = {id: forge_user.id, token: forge_user.gitea_token}
      end
    else
      result[:message] = interactor.error
    end
    result
  end
  
  def random_password
    "#{Random.rand(11111111)}"
  end
end
