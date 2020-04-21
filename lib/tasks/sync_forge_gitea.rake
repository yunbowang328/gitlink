# 执行示例  bundle exec rake sync_forge_gitea:created_repo
# 线上环境执行示例  RAILS_ENV=production bundle exec rake sync_forge_gitea:created_repo

namespace :sync_forge_gitea do
  desc "if gitea .git file not present ,and create new .git file"

  task created_repo: :environment do

    ##这个方法是更新 project的identifier 不等于 repository的identifier的问题

    all_projects = Project.joins(:repository).where("projects.identifier != repositories.identifier").includes(:repository)
    all_projects.each do |project|
      project.update_attribute(:identifier, project.repository.identifier)
    end

    # 下述方法是更新 gitea记录存在但是 forge上没有创建 gitea的问题
    # puts "__________begin_to_create_repository_git___________"
    # all_repositories = Repository.select(:id,:identifier, :user_id,:hidden,:project_id,:url).includes(project: :owner)
    # success_ids = all_repositories.where("url like ?", "%gitea.trustie.net%").pluck(:id)
    # failed_repos = all_repositories.where.not(id: success_ids)
    # failed_repos.find_each do |r|
    #   project = r.project
    #   user = project.owner
    #   unless r.url.to_s.include?("gitea.trustie.net")
    #     if user && user.try(:gitea_token).present?
    #       repo_status = Gitea::Repository::GetService.new(user, r.identifier).call
    #       if repo_status.present?
    #         r.update_attribute(:url, repo_status["clone_url"])
    #         project.update_attributes(gpid: repo_status["id"],identifier: r.identifier)
    #       else
    #         ActiveRecord::Base.transaction do
    #           repository_params= {
    #             name: r.identifier,
    #             auto_init: true,
    #             private: r.hidden,
    #           }
    #           begin
    #             gitea_repository = Gitea::Repository::CreateService.new(user.gitea_token, repository_params).call
    #             if gitea_repository
    #               r.update_attribute(:url, gitea_repository["clone_url"])
    #               project.update_attributes(gpid: repo_status["id"],identifier: r.identifier)
    #
    #             end
    #             Rails.logger.info( "__________after_create_gitea_repository_____#{gitea_repository}______")
    #
    #           rescue => e
    #             Rails.logger.info( "_________create_gitea_git________file______error: #{e}")
    #           end
    #         end
    #
    #       end
    #     end
    #   end
    # end
    # puts "__________end_to_create_repository_git___________"
  end

end