json.top do
  json.shixun_url "/shixuns"
  json.shixun_paths_url "/paths"
  json.course_url "/courses"
  json.competitions_url "#{@old_domain}/competitions"
  json.topic_url "/forums"
  json.new_course_url "/courses/new"
  json.new_shixun_url "/shixuns/new"
  json.new_shixun_path_url "/paths/new"
  json.new_project_url "#{@old_domain}/projects/new"
  json.join_course_url "/courses/join_course_multi_role"
  json.join_project_url "#{@old_domain}/applied_project/applied_project_info"
  json.message_url "#{@user_url}/user_tidings"
  json.new_message @new_message

  json.moop_cases_url "#{@old_domain}/moop_cases"
  json.crowdsourcing_url "/crowdsourcing"

  # 客户管理
  json.customer_management_url current_user.partner_managers.exists? ? "/partners/#{current_user.partner_managers.first.partner_id}/customers" : nil

  json.career_url do
    json.array! @career.to_a do |c|
      if c[1].present?
        json.name c[1]
        json.url "#{@old_domain}/careers/#{c[0]}/introduction"
      end
    end
  end
  json.auth @auth

  json.avatar_url "#{@user_url}"
  json.my_course_url "#{@user_url}"
  json.my_shixun_url "#{@user_url}?type=a_shixun"
  json.my_shixun_paths_url "#{@user_url}?type=a_path"
  json.my_project_url "#{@user_url}?type=a_project"
  json.account_manager_url "#{@old_domain}/my/account"
  json.logout_url logout_accounts_path
  json.college_identifier @user.college_identifier
  # 旧版的域名
  json.old_url @old_domain

  # 云上实验室管理权限
  laboratory_user = current_laboratory.laboratory_users.exists?(user_id: @user&.id) || @user&.admin_or_business?
  json.laboratory_user laboratory_user
  json.laboratory_admin_url laboratory_user ? "/cooperative" : nil
  json.laboratory_user @user&.admin_or_business? || current_laboratory&.laboratory_users.exists?(user_id: @user&.id)
end

json.down do
  json.web_root "#{@old_domain}"
  json.about_us "#{@old_domain}/help?index=1"
  json.connect_us "#{@old_domain}/help?index=2"
  json.cooperation_partner "#{@old_domain}/help?index=3"
  json.service_agreement "#{@old_domain}/help?index=4"
  json.help_center "#{@old_domain}/help?index=5"
  json.feedback "#{@old_domain}/help?index=6"
end

json.online_consult "https://shang.qq.com/wpa/qunwpa?idkey=2f2043d88c1bd61d182b98bf1e061c6185e23055bec832c07d8148fe11c5a6cd"
