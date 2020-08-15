class Gitea::Repository::Entries::DeleteService < Gitea::ClientService
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
  #   "message": "string",
  #   "new_branch": "string",
  #   "sha": "string", #require
  # }
  def initialize(token, owner, repo_name, filepath, body)
    @token     = token
    @owner      = owner
    @repo_name = repo_name
    @filepath  = filepath
    @body      = body
  end

  def call
    delete(url, params)
  end

  private
  def params
    Hash.new.merge(token: token, data: body)
  end

  def url
    "/repos/#{owner}/#{repo_name}/contents/#{filepath}".freeze
  end

end
