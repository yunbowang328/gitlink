require "rails_helper"


RSpec.describe "git服务" do

  let(:repo_path){'educoder/i4nzvb7x.git'}

  it "add_repository" do
    data = GitService.add_repository(repo_path: 'educoder/112233.git')
    expect data["url_to_repo"].size > 0
  end

  it "fork_repository" do
    data = GitService.fork_repository(repo_path: 'educoder/112233.git', fork_repository_path: 'educoder/44444.git')
    puts data
  end

  it "delete_repository" do
    data = GitService.delete_repository(repo_path: 'educoder/44444.git')
    puts data
  end

  it "file tree" do
    data = GitService.file_tree(repo_path: repo_path, path: '')
    expect data.size > 0
  end

  it "file_content" do
    data = GitService.file_content(repo_path: repo_path, path: 'step1/linearList_1.cpp')
    puts data
    expect data["content"].size > 0
  end

  it "commits" do
    data = GitService.commits(repo_path: repo_path)
    expect data.size > 0
  end

  it 'update_file' do
    data = GitService.update_file(repo_path: repo_path,
                              file_path: 'step1/step1.c',
                              message: 'commit by test',
                              content: 'afdjadsjfj1111',
                              author_name: 'guange',
                              author_email: '8863824@gmil.com')
    expect data.nil?
  end

end
