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
      org_extension = OrganizationExtension.build(@organization.id, params[:description], params[:website],
                                                  params[:location], params[:repo_admin_change_team_access],
                                                  params[:visibility], params[:max_repo_creation])
      team = Team.build_owner(@organization.id)
      TeamUnit.build_owner(@organization.id, team.id)
      OrganizationUser.build(@organization.id, user.id, true)
      TeamUser.build(@organization.id, user.id, team.id)

      Gitea::Organization::CreateService.call(user.gitea_token, @organization)

      Rails.logger.info("######Organization create_service end######")
    end
    @organization
  end
end