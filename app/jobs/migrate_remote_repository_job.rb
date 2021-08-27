class MigrateRemoteRepositoryJob < ApplicationJob
  queue_as :default

  def perform(repo_id, token, params)
    repo = Repository.find_by(id: repo_id)
    return if repo.blank?

    puts "############ MigrateRemoteRepositoryJob starting ... ############"

    gitea_repository = Gitea::Repository::MigrateService.new(token, params).call
    puts "#gitea_repository#{gitea_repository}"
    if gitea_repository[0]==201
      repo&.project&.update_columns(gpid: gitea_repository[2]["id"])
      repo&.mirror&.succeeded!
      puts "############ mirror status: #{repo.mirror.status} ############"
    else 
      repo&.mirror&.failed!
    end
  end
end
