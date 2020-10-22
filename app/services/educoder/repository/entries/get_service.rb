class Educoder::Repository::Entries::GetService < Educoder::ClientService
  attr_reader :repo_name, :filepath

  # filepath: path of the dir, file, symlink or submodule in the repo
  # repo_name: the name of repository
  def initialize(repo_name, filepath)
    @repo_name = repo_name
    @filepath  = filepath
  end

  def call
    get(url, params)
  end

  private
  def params
    Hash.new.merge(repo_name: repo_name, path: filepath)
  end

  def url
    "file_content".freeze
  end

  def render_result(response)
    body = JSON.parse(response.body)
    if body['status'].to_i === -1
      raise '无权限访问.'
    end
  end
end
