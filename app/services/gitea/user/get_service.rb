class Gitea::User::GetService < Gitea::ClientService
  attr_reader :username
  # params:
  # username*	string # required
  def initialize(username)
    @username = username
  end

  def call
    response = get(url, params)

    status, message, body = render_response(response)
    json_format(status, message, body)
  end

  private
  def url
    "/users/#{username}"
  end

  def params
    {username: username}
  end
  

  def json_format(status, message, body)
    case status
    when 200 then success(body)
    else
      error(message, status)
    end
  end
end