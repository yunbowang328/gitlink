desc "初始化数据同步到gitea平台"

# 先同步用户
# 再同步项目及项目成员

namespace :sync_data_to_gitea do
  desc "同步用户"
  task users: :environment do
    users = User.where.not(mail: [nil, ""], type: 'Anonymous').or(User.where.not(login: [nil, ""])).distinct
    users.find_each do |user|
      begin
        Rails.logger.info "################# user_id: #{user.id} ################# login: #{user.login}"
        #  验证login、email、
        regx = /^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9_\-.]+(\.[a-zA-Z0-9_-]+)+$/
        next unless regx.match user.mail

        tmp_password = set_password

        # TODO: Educoder sync
        interactor = Gitea::RegisterInteractor.call({username: user.login, email: user.mail, password: tmp_password})
        if interactor.success?
          gitea_user = interactor.result
          result = Gitea::User::GenerateTokenService.call(user.login, tmp_password)
          user.update_columns(gitea_token: result['sha1'], gitea_uid: gitea_user[:body]['id'])
        else
          puts "#################【Gitea: 用户同步失败: #{interactor.error}  #################"
        end

        # TODO: Trustie sync
        # user_params = {
        #   username: user.login,
        #   email: user.mail,
        #   password: tmp_password
        # }
        #
        # gitea_user = Gitea::User::RegisterService.new(user_params).call
        # result = Gitea::User::GenerateTokenService.new(user.login, tmp_password).call
        # user.update_columns(gitea_token: result['sha1'], gitea_uid: gitea_user['id'])
      rescue Exception => e
        Rails.logger.error e
        next
      end
    end
  end

  desc "同步项目"
  task projects: :environment do
    # 1. project 中的identifier与repository中的identifier不一样的问题
    # 2. 创建repository，且repository中要关联user
    # 3. 项目成员要处理同步到gitea
    projects = Project.where.not(identifier: [nil, '']).or(Project.where.not(user_id: [nil, ''])).includes(:owner, :members, :repository).distinct
    projects.find_each do |project|
      # 验证identifier的合法性，正则, 唯一性、非空
      puts "#################project_id: #{project.id} #################user_id: #{project&.owner&.id}"

      # 过滤掉游客创建的项目的bug
      next if project.owner.blank?

      begin
        # 确保project和repositoy一定是一对一的关系
        if project.repository.blank?
          begin
            Repository.create!(project_id: project.id, identifier: generate_identifier, user_id: project&.owner&.id)
            # tem_repo = Repository.new(project_id: project.id, identifier: generate_identifier, user_id: project&.owner&.id)
            # tem_repo.save!
          rescue Exception => e
            puts "################# CREATE REPOSITORY FAIL: #{e.message}"
            next
          end
        end
        puts "000000000000000000000"

        repository_params= {
          name: project.repository.identifier,
          auto_init: true,
          private: project.repository.hidden,
        }

        # user同步失败的不同步repository
        next if project&.owner&.gitea_token.blank?

        # repository的identifier为空的不同步
        next if project.repository.identifier.blank?

        begin
          gitea_repository = Gitea::Repository::CreateService.new(project.owner.gitea_token, repository_params).call
        rescue Exception => e
          puts "################# [gitea] 创建仓库失败 #################"
          puts "gitea创建失败原因: #{e.message}"
          next
        end

        update_project_info(project, gitea_repository)
        update_repository_info(project.owner, project.repository, gitea_repository)

        # 同步项目成员,只有项目同步成功后才能同步成员, 且直接指定write权限
        project.members.each do |member|
          puts "################# 开始同步成员，成员id：#{member&.user&.login}， 项目id：#{project&.repository&.identifier}，项目拥有者：#{project&.owner&.login} #################"

          begin
            permission_name = project.owner == member.user ? 'admin' : 'write'
            gitea_result = Gitea::Repository::Members::AddService.new(project.owner, project.repository.identifier, member.user.login, permission_name).call
          rescue Exception => e
            puts "################# [gitea] 同步项目成员失败 #################"
            puts "gitea同步成员失败原因: #{e.message}"
            next
          end

          if gitea_result.status == 204
            puts "################# 项目成员同步成功 #################"
            # 同步成功
          else
            puts "################# 同步项目成员失败原因：#{gitea_result}"
            # 同步失败，记录相关信息
          end
        end
      rescue Exception => e
        Rails.logger.error e.message
        puts "################# 异常信息：#{e.message}"
        # 记录失败原因
        next
      end
    end
  end


  # generte method
  def update_project_info(project, gitea_repository)
    puts "################# update_project_info #################"
    if gitea_repository
      project.update_columns(
        gpid: gitea_repository["id"],
        identifier: project.repository.identifier)
    end
  end

  def update_repository_info(owner, repository, gitea_repository)
    puts "################# update_repository_info ################# remote_repository_url: #{remote_repository_url(owner.login, repository.identifier)}"
    repository.update_columns(url: remote_repository_url(owner.login, repository.identifier), user_id: owner.id) if gitea_repository
  end

  def remote_repository_url(username, identifier)
    [Gitea.gitea_config[:domain], '/', username, '/', identifier, ".git"].join("")
  end

  def generate_identifier
    str_arr = (("a".."z").to_a + ("A".."Z").to_a)

    str = str_arr.shuffle[0..8].join
    while Repository.exists?(identifier: str)
      str = str_arr.shuffle[0..8].join
    end
    str
  end

  def set_password
    "12345678"
    # [*('a'..'z'),*(0..9),*('A'..'Z')].shuffle[0..8].join + ['$','#','&','*','@','_'].shuffle[0..2].join
  end
end
