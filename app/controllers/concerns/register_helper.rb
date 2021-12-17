module RegisterHelper
  extend ActiveSupport::Concern

  def autologin_register(username, email, password, platform = 'forge', phone = nil)
    result = {message: nil, user: nil}
    email =  email.blank? ? "#{username}@example.org" : email

    user = User.find_by(login: username)
    user = User.find_by(phone: phone) if phone.present?
    user ||= User.new(admin: false, login: username, mail: email, type: "User")

    user.password = password
    user.platform = platform
    user.phone = phone
    user.activate
    
    return unless user.valid?

    interactor = Gitea::RegisterInteractor.call({username: username, email: email, password: password})
    if interactor.success?
      gitea_user = interactor.result
      result = Gitea::User::GenerateTokenService.call(username, password)
      user.gitea_token = result['sha1']
      user.gitea_uid = gitea_user[:body]['id']
      if user.save!
        UserExtension.create!(user_id: user.id) if user.user_extension.blank?
        result[:user] = {id: user.id, token: user.gitea_token}
      end
    else
      result[:message] = interactor.error
    end
    result
  end

end
