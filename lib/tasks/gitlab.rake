namespace :sync do
  desc "sync repository for myshixun"
  task :myshixun => :environment do
    g = Gitlab.client
    myshixuns = Myshixun.where("repo_name is null")
    myshixuns.find_each do |myshixun|
      begin
        puts myshixun.identifier
        repo_name = g.project(myshixun.gpid).path_with_namespace
        puts repo_name
        myshixun.update_column(:repo_name, repo_name)
      rescue Exception => e
        Rails.logger.error("#{e.message}")
      end
    end
  end


  task :shixun => :environment do
    g = Gitlab.client
    shixuns = Shixun.where("repo_name is null")
    shixuns.find_each do |shixun|
      begin
        puts shixun.identifier
        repo_name = g.project(shixun.gpid).path_with_namespace
        puts repo_name
        shixun.update_column(:repo_name, repo_name)
      rescue Exception => e
        Rails.logger.error("#{e.message}")
      end
    end
  end


  task :check => :environment do
    g = Gitlab.client
    shixuns = Shixun.where("repo_name is null and fork_from is not null")
    shixuns.find_each do |shixun|
      begin
        puts shixun.identifier
        original_shixun = Shixun.find(fork_from)

        gshixun = g.fork(original_shixun.gpid, shixun.owner.try(:gid))

        repo_name = g.project(gshixun.id).path_with_namespace
        puts repo_name
        shixun.update_attributes(:repo_name => repo_name, :gpid => gshixun.id)
      rescue Exception => e
        Rails.logger.error("#{e.message}")
      end
    end
  end
end
