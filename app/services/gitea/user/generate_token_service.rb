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
    response = post_token(url, params)

    render_status(response)

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

  def post_token(url, params={})
    puts "[gitea] request params: #{params}"
    request_url = [api_url, url].join('').freeze
    auth_token = authen_params(params[:token])
    conn(auth_token).post do |req|
      req.url "#{request_url}"
      req.body = params[:data].to_json
    end
  end

  def render_status(response)
    case response.status
    when 200
      if response.body.size > 0
        JSON.parse(response&.body)
      else
        401
      end
    else
      401
    end
  end
end
