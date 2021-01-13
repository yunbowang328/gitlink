class Organizations::CreateService < ApplicationService
  attr_reader :user, :params

  def initialize(user, params)
    @user = user
    @params = params
  end

  def call
    Rails.logger.info("######Organization create_service begin######")
    Rails.logger.info("######params #{params}######")
    ActiveRecord::Base.transaction do
      @organization = Organization.build(params[:name])
      org_extension = OrganizationExtension.build(@organization.id, description, website,
                                                  location, repo_admin_change_team_access,
                                                  visibility, max_repo_creation)
      team = Team.build_owner(@organization.id)
      TeamUnit.build_owner(@organization.id, team.id)
      OrganizationUser.build(@organization.id, user.id, true)
      TeamUser.build(@organization.id, user.id, team.id)

      Gitea::Organization::CreateService.call(user.gitea_token, @organization)

      Rails.logger.info("######Organization create_service end######")
    end
    @organization
  end

  def description
    params[:description].present? ? params[:description] : nil
  end

  def website
    params[:website].present? ? params[:website] : nil
  end

  def location
    params[:location].present? ? params[:location] : nil
  end

  def repo_admin_change_team_access
    params[:repo_admin_change_team_access].present? ? params[:repo_admin_change_team_access] : false
  end

  def visibility
    params[:visibility].present? ? params[:visibility] : "common"
  end

  def max_repo_creation
    params[:max_repo_creation].present? ? params[:max_repo_creation] : -1
  end
end