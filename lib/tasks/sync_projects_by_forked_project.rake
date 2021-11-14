namespace :sync_projects_by_forked_project do 
  desc "sync projects is_public by forked project"
  task is_public: :environment do 
    count = 0
    Project.where.not(forked_from_project_id: nil).group(:forked_from_project_id).count.each do |k, _|
      project = Project.find_by_id(k)
      need_update_forked_projects = Project.where(forked_from_project_id: k)
      need_update_forked_projects.update_all(is_public: project&.is_public)
      need_update_forked_repositories = Repository.where(project_id: need_update_forked_projects.ids)
      need_update_forked_repositories.update_all(hidden: !project&.is_public)
      count +=need_update_forked_projects.size
    end
    puts "共同步了#{count}个项目"
  end

  task destroy: :environment do
    count = 0 
    Project.where.not(forked_from_project_id: nil).find_each do |project| 
      if project.forked_from_project.nil?
        project.update(forked_from_project_id: nil)
        count +=1 
      end
    end
    puts "共同步了#{count}个项目"
  end
end