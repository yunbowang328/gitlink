namespace :produce_and_export_ceshi_user do 
  desc "Produce ceshi user and Export to excel"
  task call: :environment do 
    puts "=======Begin======="
    email = FFaker::Internet.unique.email 
    username = email.split("@")[0]
    password = SecureRandom.base64[8..-1]
    p = Axlsx::Package.new 
    p.workbook.add_worksheet(:name => '测试用户') do |sheet| 
      sheet.add_row ["用户名", "邮箱", "密码", "GiteaToken", "测试仓库", "测试仓库克隆地址"]
      (1..100).to_a.each do |i|
        while (User.find_by(login: username).present? || User.find_by(mail: email).present?) do 
          email = FFaker::Internet.unique.email 
          username = email.split("@")[0]
          password = SecureRandom.base64[8..-1]
        end
        puts "=======Generate:[#{i}] Username: #{username}, Password: #{password}, Email: #{email}======="
        puts "=======Create User Begin====== "

        user = User.new(admin: false, login: username, mail: email, type: "User")
        user.password = password
        user.platform = 'forge'
        user.activate
        
        next unless user.valid?
  
        interactor = Gitea::RegisterInteractor.call({username: username, email: email, password: password})
        if interactor.success?
          gitea_user = interactor.result
          result = Gitea::User::GenerateTokenService.call(username, password)
          user.gitea_token = result['sha1']
          user.gitea_uid = gitea_user[:body]['id']
          if user.save!
            UserExtension.create!(user_id: user.id)
          end
        end
  
        puts "=======Create User End====== "
        DCODES = %W(1 2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z)
        code = DCODES.sample(8).join
        project_params = {
          user_id: user.id, 
          name: code,
          repository_name: code, 
          project_category_id: ProjectCategory.pluck(:id).sample,
          project_language_id: ProjectLanguage.pluck(:id).sample,
          license_id: License.pluck(:id).sample,
          ignore_id: Ignore.pluck(:id).sample,
          private: true
        }
        project = Projects::CreateService.new(user, project_params).call
        puts project.as_json
        sheet.add_row [username, email, password, user.gitea_token, "#{username}/#{code}", project&.repository.url]
      end
    end
    p.use_shared_strings = true 
    p.serialize('ceshi_user.xlsx')

    puts "=======END======="
  end
end