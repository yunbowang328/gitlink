# 根据对应的用户名和秘密生成token
class Gitea::User::GenerateTokenService < Gitea::ClientService
  attr_reader :username, :password

  def initialize(username, password)
    @username  = username
    @password  = password
  end

  def call
    params = {}
    url = "/users/#{username}/tokens".freeze
    params = params.merge(token: token_params, data: request_params)
    post(url, params)
  end

  private
  def token_params
    {
      username: username,
      password: password
    }
  end

  def request_params
    { name: username }
  end
end
