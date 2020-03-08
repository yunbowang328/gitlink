class Gitea::Versions::CreateService < Gitea::ClientService
  attr_reader :token, :user_name, :repo, :params

  # params EX:
  # {
  #   "body": "sylor",  #user_name
  #   "draft": false,
  #   "name": "string",
  #   "prerelease": true,
  #   "tag_name": "string",
  #   "target_commitish": "string"
  # }
  def initialize(token, user_name, repo, params)
    @token = token
    @params = params
    @user_name = user_name
    @repo = repo
  end

  def call
    post(url, request_params)
  end

  private

  def request_params
    Hash.new.merge(token: token, data: params)
  end

  def url
    "/repos/#{@user_name}/#{@repo}/releases".freeze
  end

end
