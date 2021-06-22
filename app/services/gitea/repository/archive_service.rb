class Gitea::Repository::ArchiveService < Gitea::ClientService
  attr_reader :owner, :repo, :archive, :token

  def initialize(owner, repo, archive, token=nil)
    @owner   = owner
    @repo    = repo
    @archive = archive
    @token   = token
  end

  def call
    response = get(url, params)
    response_payload(response)
  end

  private
  def params
    Hash.new.merge(token: token)
  end

  def url
    "/repos/#{owner}/#{repo}/archive/#{archive}".freeze
  end

  def response_payload(response)
    status = response.status
    body = response&.body

    log_error(status, body)
    status_payload(status, body)
  end

  def status_payload(status, body)
    case status
    when 200 then success
    when 404 then error("你操作的链接不存在!")
    else error("系统错误!")
    end
  end
end
