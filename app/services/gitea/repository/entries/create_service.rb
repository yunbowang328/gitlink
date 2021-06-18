class Gitea::Repository::Entries::CreateService < Gitea::ClientService
  attr_reader :token, :owner, :repo_name, :filepath, :body

  # ref: The name of the commit/branch/tag. Default the repository’s default branch (usually master)
  # filepath: path of the dir, file, symlink or submodule in the repo
  # repo_name: the name of repository
  # body:
  # {
  #   "author": {
  #     "email": "user@example.com",
  #     "name": "string"
  #   },
  #   "branch": "string",
  #   "committer": {
  #     "email": "user@example.com",
  #     "name": "string"
  #   },
  #   "content": "string", # content must be base64 encoded
  #   "message": "string",
  #   "new_branch": "string"
  # }
  #
  def initialize(token, owner, repo_name, filepath, body)
    @token     = token
    @owner      = owner
    @repo_name = repo_name
    @filepath  = filepath
    @body      = body
  end

  def call
    response = post(url, params)
    response_payload(response)
  end

  private
  def params
    Hash.new.merge(token: token, data: body)
  end

  def url
    "/repos/#{owner}/#{repo_name}/contents/#{filepath}".freeze
  end

  def response_payload(response)
    status = response.status
    body = response&.body

    log_error(status, body)
    status_payload(status, body)
  end

  def status_payload(status, body)
    case status
    when 201 then success(json_parse!(body))
    when 403 then error("你没有权限操作!")
    when 404 then error("你操作的链接不存在!")
    when 422 then error("#{filepath}文件已存在，不能重复创建!")
    else error("系统错误!")
    end
  end
end
