desc "Generate gitea data"

namespace :create_gitea_data do
  task created_user: :environment do

    puts "__________begin_to_create_user_gitea_data___________"

    gitea_users = User.where(platform: "military", gitea_uid: nil)
    gitea_users.each_with_index do |u,index|
      puts "___#{index+1}_______u.login:#{u.login}___________"
      user_password = random_password

      user_mail = u.mail ? u.mail : "#{u.login}_#{u.id}_example@example.com"
      begin
        interactor = Gitea::RegisterInteractor.call({username: u.login, email: user_mail, password: user_password})
        if interactor.success?
          gitea_user = interactor.result
          result = Gitea::User::GenerateTokenService.new(u.login, user_password).call
          u.gitea_token = result['sha1']
          u.gitea_uid = gitea_user['id']
          u.save!
          puts "____creat_success______u.login:#{u.login}___________"
        end
      rescue Exception => e
        failed_dic = "#{Rails.root}/public/sync_failed_users.dic"
        File.open(failed_dic,"a") do |file|
          file.puts "[\nTime---#{Time.now}\nuser_info---#{u.login}\nerrors--#{e}]\n "
        end
        puts "____creat_failed______u.login:#{u.login}_____message:#{e}______"
      end
    end
  end

  task created_repo: :environment do
    puts "__________begin_to_create_repository_gitea_data___________"
    user_ids = User.select(:id,:platform).all.where(platform: "military").pluck(:id)

    gitea_projects = Project.where(user_id: user_ids)
    gitea_projects.each_with_index do |p,index|
      puts "___#{index+1}_______project.id:#{p.id}___________"
      unless p.repository.present?
        identifier = p.identifier ? p.identifier : "#{Time.now.to_i}_#{p.id}"
        begin
          repository_params = {
            hidden: p["is_public"],
            user_id: p.user_id,
            identifier: identifier
          }
          Repositories::CreateService.new(p.owner, p, repository_params).call
          puts "____creat_success______project.id:#{p.id}___________"
        rescue Exception => e
          failed_dic = "#{Rails.root}/public/sync_failed_users.dic"
          File.open(failed_dic,"a") do |file|
            file.puts "[\nTime---#{Time.now}\nproject_id---#{p.id}\nerrors--#{e}]\n "
          end
        end
      end
    end
  end

  def random_password
    [*('a'..'z'),*(0..9),*('A'..'Z')].shuffle[0..8].join + ['$','#','&','*','@','_'].shuffle[0..2].join
  end
end