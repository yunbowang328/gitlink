class Organizations::Teams::UpdateService < ApplicationService
  attr_reader :user, :team, :params

  def initialize(user, team, params)
    @user = user
    @team = team
    @params = params
  end

  def call
    Rails.logger.info("######Team update_service begin######")
    Rails.logger.info("######params #{params}######")
    ActiveRecord::Base.transaction do
      update_team(update_params)
      update_units
      team.reload
      team.setup_team_project!
      update_gitea_team
    end
    Rails.logger.info("######Team update_service end######")

    team
  end

  private
  def update_params
    if team.authorize == "owner"
      update_params = params.slice(:description)
    else
      update_params = params.slice(:name, :nickname, :description, :authorize, :includes_all_project, :can_create_org_project)
    end
    update_params
  end

  def units_params
    %w(admin owner).include?(team.authorize) ? %w(code issues pulls releases) : params[:unit_types]
  end

  def update_team(update_params)
    team.update_attributes!(update_params)
  end

  def update_units
    return if units_params.blank?
    begin
      team.team_units.map{|u|u.destroy!}
      Rails.logger.info units_params
      units_params.each do |unit|
        TeamUnit.build(team&.organization&.id, team.id, unit)
      end
    rescue
      raise ActiveRecord::Rollback, "TeamUnit update error"
    end
  end

  def update_gitea_team
    Gitea::Organization::Team::UpdateService.call(team&.organization&.gitea_token, team)
  end
end