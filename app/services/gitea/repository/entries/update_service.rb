class Gitea::Repository::Entries::UpdateService < Gitea::ClientService
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
    put(url, params)
  end

  private
  def params
    Hash.new.merge(token: token, data: body)
  end

  def url
    "/repos/#{owner}/#{repo_name}/contents/#{filepath}".freeze
  end

end
