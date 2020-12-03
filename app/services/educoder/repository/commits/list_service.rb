class Educoder::Repository::Commits::ListService < Educoder::ClientService
  attr_reader :repo_name, :args

  # ref: The name of the commit/branch/tag. Default the repository’s default branch (usually master)
  # repo_name: the name of repository
  #  Educoder::Repository::Commits::ListService.call('fessf/6hiwcb7o20200917174054')
  def initialize(repo_name, **args)
    @repo_name = repo_name
    @args      = {ref: 'master'}.merge(args.compact)
  end

  def call
    response = get(url, params)
    render_result(response)
  end

  private
  def params
    @args.merge(repo_name: repo_name)
  end

  def url
    "commits".freeze
  end

  def render_result(response)
    response['commits'] || []
  end
end
