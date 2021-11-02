class Gitea::User::DeleteService < Gitea::ClientService
  attr_reader :username

  def initialize(username)
    @username  = username
  end

  def call
    response = delete(request_url, params)

    render_status(response)
  end

  private
  def token
    {
      username: Gitea.gitea_config[:access_key_id],
      password: Gitea.gitea_config[:access_key_secret]
    }
  end

  def request_url
    "/admin/users/#{username}"
  end

  def params 
    Hash.new.merge(token: token)
  end
  

end
