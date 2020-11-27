# creates a new OAuth2 application
class Gitea::Oauth2::CreateService < Gitea::ClientService
  attr_reader :token, :params

  # params:
    # {
    #   "name": "string",
    #   "redirect_uris": [
    #     "string"
    #   ]
    # }
  # ep: Gitea::OAuth2::CreateService.call(current_user.gitea_token, {name: 'oauth_name', redirect_uris: ['url']})
  # return values example:
    # {
    #   "client_id": "string",
    #   "client_secret": "string",
    #   "created": "2020-07-08T03:12:49.960Z",
    #   "id": 0,
    #   "name": "string",
    #   "redirect_uris": [
    #     "string"
    #   ]
    # }
  def initialize(token, params)
    @token   = token
    @params  = params
  end

  def call
    post(url, request_params)
  end

  private
    def url
      "/user/applications/oauth2".freeze
    end

    def request_params
      params.merge(token: token, data: params).compact
    end
end
