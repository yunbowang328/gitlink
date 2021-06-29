namespace :sync_projects_by_forked_project do 
  desc "sync projects is_public by forked project"
  task is_public: :environment do 
    count = 0
    Project.where.not(forked_from_project_id: nil).find_each do |project|
      project.update(is_public: project&.forked_from_project&.is_public)
      count +=1
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