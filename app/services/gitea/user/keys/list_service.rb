class Gitea::User::Keys::ListService < Gitea::ClientService
  attr_reader :token, :page, :limit, :fingerprint

  def initialize(token, page, limit, fingerprint="")
    @token = token 
    @page = page 
    @limit = limit 
    @fingerprint = fingerprint
  end

  def call 
    response = get(url, params)
    render_response(response)
  end

  private 

  def params 
    Hash.new.merge({token: token, fingerprint: fingerprint, page: page, limit: limit})
  end

  def url 
    '/user/keys'.freeze
  end

end