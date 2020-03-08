# 需要做的几件事：
# 1、检测两边（TPM\TPI）同步后有更新的仓库
#

namespace :git do
  desc "检测是否TPM是否需要更新"
  task :shixun_check_update => :environment do
    g = Gitlab.client
    file_txt = File.new("lib/gitcheck/shixun_update.txt", "r+")
    file_error_txt = File.new("lib/gitcheck/shixun_update_error.txt", "r+")
    host = EduSetting.find_by_name("git_address_domain").try(:value)
    Shixun.find_each do |shixun|
      begin
        gitlab_commit = g.commits(shixun.gpid, :ref_name => 'master').first.try(:id)
        repo_name = shixun.repo_name
        git_commit = GitService.commits(repo_path: "#{repo_name}.git").first["id"]
        git_url = host + "/" + repo_name + ".git\n"
        if git_commit != gitlab_commit
          file_txt.syswrite(git_url)
        end
      rescue
        file_error_txt.syswrite("#{shixun.identifier}\n")
      end
    end
  end

  desc "检测版本库是否有更新"
  task :myshixuns_check_update => :environment do
    g = Gitlab.client
    file_txt = File.new("lib/gitcheck/myshixun_update.txt", "r+")
    file_error_txt = File.new("lib/gitcheck/myshixun_update_error.txt", "r+")
    host = EduSetting.find_by_name("git_address_domain").try(:value)
    Myshixun.find_each do |myshixun|
      begin
        gitlab_commit = g.commits(myshixun.gpid, :ref_name => 'master').first.try(:id)
        repo_name = myshixun.repo_name
        git_commit = GitService.commits(repo_path: "#{repo_name}.git").first["id"]
        git_url = host + "/" + repo_name + ".git\n"
        if git_commit != gitlab_commit
          file_txt.syswrite(git_url)
        end
      rescue
        file_error_txt.syswrite("#{myshixun.identifier}\n")
      end
    end
  end


  # 检测TPI没有迁移过来的
  task :check => :environment do

  end
end
