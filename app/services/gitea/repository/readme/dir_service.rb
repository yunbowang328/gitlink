class Gitea::Repository::Readme::DirService < Gitea::ClientService 
  attr_reader :owner, :repo, :ref, :dir, :token 

  def initialize(owner, repo, dir, ref='', token=nil) 
    @owner = owner 
    @repo = repo 
    @dir = dir
    @ref = ref
    @token = token
  end

  def call 
    response = get(url, params) 
    status, message, body = render_response(response)
    json_format(status, message, body)
  end

  private 
  def params
    Hash.new.merge(token: token, ref: ref) 
  end

  def url
    "/repos/#{owner}/#{repo}/readme/#{dir}".freeze 
  end

  def json_format(status, message, body)
    case status 
    when 200 then success(body)
    when 404 then error(message, 404)
    else error(message, status)
    end
  end
end