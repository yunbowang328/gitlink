# 执行示例  bundle exec rake gitea_create_repository:created_repo


namespace :gitea_create_repository do
  desc "if gitea .git file not present ,and create new .git file"

  task created_repo: :environment do
    puts "__________begin_to_create_repository_git___________"
    all_repositories = Repository.select(:id,:identifier, :user_id,:hidden,:project_id).includes(project: :owner)
    all_repositories.find_each do |r|
      user = r.project.owner
      if user && user.try(:gitea_token).present?   #防止用户在forge创建了repository，但是在gitea上没有创建用户
        repo_status = Gitea::Repository::CheckPresentService.new(user, r.identifier).call
        unless [200, 201, 204].include?(repo_status)
          delete_gitea = Gitea::Repository::DeleteService.new(user, r.identifier).call
          if delete_gitea.status == 204 || delete_gitea.status == 404   #删除成功或者仓库不存在，都重新创建
            repository_params= {
              name: r.identifier,
              auto_init: true,
              private: r.hidden,
            }
            gitea_repository = Gitea::Repository::CreateService.new(user.gitea_token, repository_params).call
            puts "__________after_create_gitea_repository_____#{gitea_repository}______"
          else
            puts "__________delete_gitea__repository_failed,status:_____#{delete_gitea.status}______"
          end
        end
      else
        puts "_________this_user_have_no_gitea_token__login:#{user&.login}_________"
      end
    end
    puts "__________end_to_create_repository_git___________"
  end

end