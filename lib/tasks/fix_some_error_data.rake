desc "Fix Some Unstep Data"

namespace :fix_some_error_data do
  task org_member_and_project_member: :environment do
    puts "======Begin: fix organization memberr======"
    fix_org_count = 0
    OrganizationUser.find_each do |org_user|
      org = org_user.organization
      if org.team_users.where(user_id: org_user.user_id).blank?
        Gitea::Organization::OrganizationUser::DeleteService.call(org_user.organization.gitea_token, org_user.organization.login, org_user&.user&.login)
        org_user.destroy 
        fix_org_count += 1
      end
    end
    puts "======Count: #{fix_org_count}======"
    puts "======End: fix organization member and project member======"
    puts "======Begin: fix project member======"
    fix_pro_count = 0
    Member.joins(project: :owner).where(users: {type: 'Organization'}).find_each do |member|
      if member.project.owner.team_users.where(user_id: member.user_id).blank?
        next 
      else 
        member.destroy
        fix_pro_count += 1
      end
    end
    puts "======Count: #{fix_pro_count}======"
    puts "======End: fix project member======"
  end

  task open_full_gitea_team_authorize: :environment do 
    puts "======Begin: fix open full team authorize======"
    team_count = 0
    Team.find_each do |team|
      team.team_units.destroy_all
      %w(code issues pulls wiki releases).each do |unit|
        TeamUnit.build(team.organization_id, team.id, unit)
      end
      Gitea::Organization::Team::UpdateService.call(team&.organization&.gitea_token, team)
      team_count += 1
    end
    puts "======Count: #{team_count}======"
    puts "======End: fix open full team authorize======"
  end
end