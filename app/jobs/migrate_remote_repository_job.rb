class MigrateRemoteRepositoryJob < ApplicationJob
  queue_as :default

  def perform(repo_id, token, params)
    repo = Repository.find_by(id: repo_id)
    return if repo.blank?

    puts "############ MigrateRemoteRepositoryJob starting ... ############"

    gitea_repository = Gitea::Repository::MigrateService.new(token, params).call
    if gitea_repository
      repo&.project&.update_columns(gpid: gitea_repository["id"])
      repo&.mirror&.update_columns(status: Mirror.statuses[:succeeded])

      project = repo.project

      json_data = {
        mirror_status: repo.mirror_status,
        mirror_num: repo.mirror_num,
        mirror_url: repo.mirror_url,
        first_sync: repo.first_sync?,
        identifier: repo.identifier,
        name: project.name,
        id: project.id,
        type: project.numerical_for_project_type
      }
      puts "############ broadcast start.......... ############"
      cable_result = ActionCable.server.broadcast "channel_room_#{repo.identifier}", project: json_data

      puts "############ room_channel_#{repo.identifier} result : #{cable_result}"
    end
  end
end
