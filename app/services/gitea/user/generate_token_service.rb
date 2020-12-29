# 根据对应的用户名和秘密生成token
class Gitea::User::GenerateTokenService < Gitea::ClientService
  attr_reader :username, :password

  def initialize(username, password)
    @username  = username
    @password  = password
  end


  def call
    params = Hash.new.merge(token: token_params, data: request_params)
    response = post(url, params)

    render_200_response(response)
  end

  private

  def url
    "/users/#{@username}/tokens".freeze
  end

  def token_params
    {
      username: username,
      password: password
    }
  end

  def request_params
    { name: "#{@username}-#{token_name}" }
  end

  def token_name
    SecureRandom.hex(6)
  end
end
