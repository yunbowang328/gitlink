class SyncRepoUpdateTimeJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    Project.forge.find_each do |project|
      update_repo_time!(project)
    end
  end

  private
  def gitea_repo_updated_at(project)
    admin = User.where(admin: true).select(:id, :gitea_token, :gitea_uid).last
    puts "########## project id: #{project.id}"

    return nil if project.gpid.blank?
    result = Gitea::Repository::GetByIdService.call(project.gpid, admin.gitea_token)

    result[:status] === :success ? result[:body]['updated_at'] : nil
  end

  def update_repo_time!(project)
    project.set_updated_on gitea_repo_updated_at(project)
  end
end
