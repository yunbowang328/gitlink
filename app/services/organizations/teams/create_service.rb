class Organizations::Teams::CreateService < ApplicationService
  attr_reader :user, :org, :params
  attr_accessor :team, :gitea_team

  def initialize(user, org, params)
    @user = user
    @org = org
    @params = params
  end

  def call
    Rails.logger.info("######Team create_service begin######")
    Rails.logger.info("######params #{params}######")
    ActiveRecord::Base.transaction do
      create_team
      create_units
      create_gitea_team
      sync_team_gtid
      team.setup_team_project!
    end
    Rails.logger.info("######Team create_service end######")

    team
  end

  private
  def name
    params[:name]
  end

  def nickname 
    params[:nickname]
  end

  def description
    params[:description]
  end

  def authorize
    params[:authorize].present? ? params[:authorize] : "common"
  end

  def includes_all_project
    params[:includes_all_project].present? ? params[:includes_all_project] : false
  end

  def can_create_org_project
    params[:can_create_org_project].present? ? params[:can_create_org_project] : false
  end

  def create_team
    @team = Team.build(org.id, name, nickname, description, authorize,
                       includes_all_project, can_create_org_project)
  end

  def units_params
    %w(admin owner).include?(authorize) ? %w(code issues pulls releases) : params[:unit_types]
  end

  def create_units
    return if units_params.blank?
    begin
      units_params.each do |unit|
        TeamUnit.build(org.id, team.id, unit)
      end
    rescue
      raise ActiveRecord::Rollback, "TeamUnit create error"
    end
  end

  def create_gitea_team
    @gitea_team = Gitea::Organization::Team::CreateService.call(org.gitea_token, org, team)
  end

  def sync_team_gtid
    team.update!(gtid: gitea_team["id"])
  end

end