class Gitea::Repository::GetByIdService < Gitea::ClientService
  attr_reader :token, :id

  def initialize(id, token=nil)
    @token = token
    @id    = id
  end

  def call
    response = get(url, params)

    status, message, body = render_response(response)
    json_format(status, message, body)
  end

  private
  def params
    Hash.new.merge(token: token)
  end

  def url
    "/repositories/#{id}".freeze
  end

  def json_format(status, message, body)
    case status
    when 200 then success(body)
    else
      error(message, status)
    end
  end
end
