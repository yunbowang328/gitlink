class Educoder::Repository::Entries::ListService < Educoder::ClientService
  attr_reader :repo_name, :args

  # ref: The name of the commit/branch/tag. Default the repository’s default branch (usually master)
  # repo_name: the name of repository
  # args:
  # {
  #   "repo_name": "wmov43ez8/5xahe2t7nv20191022173304",
  #   "path": 'src'
  # }
  # Educoder::Repository::Entries::ListService.new('wmov43ez8/5xahe2t7nv20191022173304', {path: 'src'}).call
  def initialize(repo_name, args={})
    @repo_name = repo_name
    @args      = args.compact
  end

  def call
    get(url, params)
  end

  private
  def params
    @args.merge(repo_name: repo_name)
  end

  def url
    "repository".freeze
  end

  def render_result(response)
    body = JSON.parse(response.body)
    case response.status
    when 200
      body
    else
     []
    end
  end
end
