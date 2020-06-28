class Gitea::Repository::CreateService < Gitea::ClientService
  attr_reader :token, :params

  # params EX:
  # {
  #   "auto_init": true,
  #   "description": "string",
  #   "gitignores": "string",
  #   "issue_labels": "string",
  #   "license": "string",
  #   "name": "string", *
  #   "private": true,
  #   "readme": "string"
  # }
  def initialize(token, params)
    @token = token
    @params = params
  end

  def call
    post(url, request_params)
  end

  private

  def request_params
    create_params = params.merge(readme: "readme")
    Hash.new.merge(token: token, data: create_params)
  end

  def url
    "/user/repos".freeze
  end

end
