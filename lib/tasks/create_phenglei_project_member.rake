desc "Create Phenglei project members from excel"
namespace :create_phenglei_project_member do
  task init: :environment do
    project = Project.find_by_id(477)
    doc = SimpleXlsxReader.open("#{Rails.root}/public/phenglei_user.xlsx")
    data = doc.sheets.first.rows
    err_rows = []
    success_count = 0
    data.each_with_index do |i, index|
      next if index == 0 || i[1].nil?
      begin
        user = User.find_by(phone: i[1])
        next unless user.present?
        unless project.member?(user.id)
          Projects::AddMemberInteractor.call(project.owner, project, user, "read", true)
          success_count += 1
          puts "========成功添加手机号为#{i[1]}的用户为项目#{project.id}的协作者======="
        end
        puts "========#{i[0]}数据处理完毕======="
      rescue => e
        puts e
        err_rows += i
      end
    end
    puts success_count
    puts err_rows
  end
end