namespace :create_mulan_repository do 
  desc "sync mulan repository from gitee.com"
  task sync_from_gitee: :environment do 
    doc = SimpleXlsxReader.open("#{Rails.root}/public/mulan_repo.xlsx")
    data = doc.sheets.first.rows
    data.each_with_index do |row, index|
      next if index == 0
      begin
        user = User.find_by(login: row[1])
        unless user.present?
          username = row[1]
          email = "#{row[1]}@forge.com"
          password = "Mr123456."
          user = User.new(nickname: row[0], login: username, mail: email, password: password, type: 'User')
          interactor = Gitea::RegisterInteractor.call({username: username, email: email, password: password})
          gitea_user = interactor.result
          result = Gitea::User::GenerateTokenService.call(username, password)
          user.gitea_token = result['sha1']
          user.gitea_uid = gitea_user[:body]['id']
          user.save!
          UserExtension.create!(user_id: user.id)
        end
        project = user.projects.find_by(identifier: row[4])
        unless project.present?
          p_category = ProjectCategory.find_or_create_by(name: row[6])
          p_language = ProjectLanguage.find_or_create_by(name: row[7].split("/")[0])
          p_license = License.find_by(name: row[8])

          mirror_params = {
            user_id: user.id,
            name: row[5],
            description: row[9],
            repository_name: row[4],
            project_category_id: p_category.id,
            project_language_id: p_language.id, 
            clone_addr: row[10]
          }
          Projects::MigrateService.call(user, mirror_params)
        end
        puts "sync mulan repository from gitee.com Success repo: #{row[5]} username: #{row[0]}"   
      rescue Exception => e
        puts "sync mulan repository from gitee.com Error repo: #{row[5]} username: #{row[0]}"   
      end
    end
  end
end