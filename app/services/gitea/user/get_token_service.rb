
class Gitea::User::GetTokenService < Gitea::ClientService
  attr_reader :username

  def initialize(username)
    @username  = username
  end

  def call
    params = {}
    url = "/users/#{username}".freeze
    params = params.merge(data: request_params)
    get(url, params)
  end

  private
  # def token_params
  #   {
  #     username: username,
  #     password: password
  #   }
  # end

  def request_params
    { username: username }
  end
end
