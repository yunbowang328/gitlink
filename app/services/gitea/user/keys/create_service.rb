class Gitea::User::Keys::CreateService < Gitea::ClientService 
  attr_reader :token, :params 
  def initialize(token, params) 
    @token = token
    @params = params
  end

  def call 
    response = post(url, request_params)
    render_response(response)
  end

  private
  def request_params 
    Hash.new.merge({token: token, data: params})
  end

  def url
    '/user/keys'.freeze
  end
end