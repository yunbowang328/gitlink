class Gitea::Versions::DeleteService < Gitea::ClientService
  attr_reader :token, :user_name, :repo,:version_gid

  def initialize(token, user_name, repo,version_gid)
    @token = token
    @user_name = user_name
    @repo = repo
    @version_gid = version_gid
  end

  def call
    response = delete(url, params)
    return response
  end

  private

  def params
    Hash.new.merge(token: @token)
  end

  def url
    "/repos/#{@user_name}/#{@repo}/releases/#{@version_gid}".freeze
  end

end
