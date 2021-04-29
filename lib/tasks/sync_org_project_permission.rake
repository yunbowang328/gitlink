namespace :sync_org_project_permission do 
  desc "sync organization project team permissions"
  task mirror: :environment do 
    Project.mirror.includes(:team_projects,:owner).where(team_projects: {id: nil}, users: {type: 'Organization'}).find_each do |project| 
      project.set_owner_permission(nil)
    end
  end
end