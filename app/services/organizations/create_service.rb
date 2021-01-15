class Organizations::CreateService < ApplicationService
  attr_reader :user, :params
  attr_accessor :organization, :gitea_organization, :owner_team

  def initialize(user, params)
    @user = user
    @params = params
  end

  def call
    Rails.logger.info("######Organization create_service begin######")
    Rails.logger.info("######params #{params}######")
    ActiveRecord::Base.transaction do
      create_org_and_extension
      create_owner_info
      create_gitea_org
      sync_owner_team_gtid

      Rails.logger.info("######Organization create_service end######")
    end
    @organization
  end

  private
  def description
    params[:description]
  end

  def website
    params[:website]
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

  def create_org_and_extension
    @organization = Organization.build(params[:name], user.gitea_token)
    org_extension = OrganizationExtension.build(organization.id, description, website,
                                                location, repo_admin_change_team_access,
                                                visibility, max_repo_creation)
  end

  def create_owner_info
    @owner_team = Team.build(organization.id, "Owner", "", 4, true, true)
    TeamUnit.unit_types.keys.each do |u_type|
      TeamUnit.build(organization.id, owner_team.id, u_type)
    end
    OrganizationUser.build(organization.id, user.id)
    TeamUser.build(organization.id, user.id, owner_team.id)
  end

  def create_gitea_org
    @gitea_organization = Gitea::Organization::CreateService.call(@organization.gitea_token, organization)
  end

  def sync_owner_team_gtid
    owner_team.update!(gtid: gitea_organization["owner_team"]["id"])
  end
end