# 执行示例 bundle exec rake sync_org_mirror_repo:init_org_gitea_uid
# RAILS_ENV=production bundle exec rake sync_org_mirror_repo:init_org_gitea_uid
#

namespace :sync_org_mirror_repo do
  desc "更新组织gitea_uid"
  task init_org_gitea_uid: :environment do
    puts "=========begin to init organization gitea_uid=========="
    need_init_orgs = Organization.where(gitea_uid: nil)
    puts "=========need init count is [#{need_init_orgs.size}]=========="
    need_init_orgs.find_each do |org|
      puts "=== fix org name is [#{org.name}] ==="
      gitea_org = Gitea::Organization::GetService.call(org)
      if gitea_org[:status] == 404
        org.destroy
        next
      end
      org.update(gitea_uid: gitea_org["id"])
    end
    puts "========end to init organization gitea_uid==========="
  end

  desc "同步组织创建失败的镜像项目"
  task fix_mirror_repo: :environment do
    puts "========begin to fix mirror repository ========="
    need_fix_repos = Repository.joins(:mirror, project: :owner)
                         .where.not(mirrors: {id: nil})
                         .where(users: {type: 'Organization'})
    need_fix_repos.find_each do |repo|
      next if repo.user_id == repo.project&.user_id
      puts "=== fix repository owner is [#{repo&.project&.owner&.login}] ==="
      puts "=== fix repository identifier is [#{repo.identifier}] ==="
      Gitea::Repository::DeleteService.call(repo.project.owner, repo.identifier)
      gitea_repository_params = {
          clone_addr: repo.mirror_url,
          repo_name: repo.identifier,
          uid: repo.project.owner.gitea_uid,
          private: repo.hidden,
          mirror: ActiveModel::Type::Boolean.new.cast(repo.is_mirror) || false,
          auth_username: repo.login,
          auth_password: repo.password
      }
      MigrateRemoteRepositoryJob.perform_later(repo.id, repo.project&.owner&.gitea_token, gitea_repository_params)
      repo.update_columns(user_id: repo.project&.user_id)
    end
    puts "========end to fix mirror repository ========="
  end
end