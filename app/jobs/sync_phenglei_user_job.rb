class SyncPhengleiUserJob < ApplicationJob
  queue_as :default

  def perform(project_id=nil)
    project_id ||= EduSetting.get("sync_phenglei_user_project")
    project = Project.find_by_id(project_id)
    return if project.nil?
    member_count, success_count, error_count, not_exsit_count = 0, 0, 0, 0
    Rails.logger.info("======begin to sync phenglei user to project#{project.owner.login + "/" + project.identifier}")
    doc = SimpleXlsxReader.open("#{Rails.root}/public/phenglei_user.xlsx")
    data = doc.sheets.first.rows
    data.each_with_index do |i, index|
      next if index == 0 || i[1].nil?
      puts "======开始处理#{i[1]}"
      user = User.find_by(phone: i[1])
      if user.present?
        if project.member?(user.id)
          puts "======#{i[1]}用户已经是外围贡献者了"
          member_count += 1
        else
          interactor = Projects::AddMemberInteractor.call(project.owner, project, user, "read", true)
          if interactor.error.nil?
            puts "========用户#{i[1]}成功添加为项目的外围贡献者======="
            success_count += 1
          else
            puts "========用户#{i[1]}添加失败"
            error_count += 1
          end
        end
      else
        puts "=====#{i[1]}用户不存在"
        not_exsit_count += 1
        next
      end
    end
    Rails.logger.info("======已存在外围贡献者数量#{member_count}, 成功添加用户数量#{success_count}, 添加失败用户数量#{error_count}, 找不到用户数量#{not_exsit_count}")
    Rails.logger.info("======end to sync phenglei user to project#{project.owner.login + "/" + project.identifier}")
  end
end