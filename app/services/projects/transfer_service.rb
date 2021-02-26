class Projects::TransferService < ApplicationService
  attr_accessor :project, :owner, :new_owner, :gitea_repo

  def initialize(project, new_owner)
    @project = project
    @owner = project.owner
    @new_owner = new_owner
  end

  def call
    Rails.logger.info("###### Project transfer_service begin ######")
    ActiveRecord::Base.transaction do
      gitea_update_owner
      update_owner
      update_repo_url
      update_visit_teams
    end

    Rails.logger.info("##### Project transfer_service end ######")

    @project.reload
  end

  private
  def update_owner
    project.update!(user_id: new_owner.id)
  end

  def update_repo_url
    project.repository.update!(url: @gitea_repo["clone_url"])
  end

  def update_visit_teams
    if new_owner.is_a?(Organization)
      new_owner.teams.where(includes_all_project: true).each do |team|
        TeamProject.build(new_owner.id, team.id, project.id)
      end
    else
      project.team_projects.each(&:destroy!)
    end
  end

  def gitea_update_owner
    begin
      @gitea_repo = Gitea::Repository::TransferService.call(owner&.gitea_token, owner&.login, project.identifier, new_owner&.login)
    rescue Exception => e
      Rails.logger.info("##### Project transfer_service, gitea transfer error #{e}")
    end
  end
end