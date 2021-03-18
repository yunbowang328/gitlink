class Gitea::Repository::Files::GetService < Gitea::ClientService 
  attr_reader :owner, :repo_name, :ref, :q, :token

  def initialize(owner, repo_name, ref, q=nil, token=nil)
    @owner = owner 
    @repo_name = repo_name 
    @ref = ref 
    @q = q 
    @token = token
  end

  def call 
    response = get(url, params)
    render_status(response)
  end

  private 
  def params
    Hash.new.merge(token: token, ref: ref, q: q)
  end

  def url 
    "/repos/#{owner.login}/#{repo_name}/find"
  end
end