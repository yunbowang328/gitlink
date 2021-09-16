# == Schema Information
#
# Table name: message_templates
#
#  id               :integer          not null, primary key
#  type             :string(255)
#  sys_notice       :text(65535)
#  email            :text(65535)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  notification_url :string(255)
#

# 我管理的仓库项目设置被更改
class MessageTemplate::ProjectSettingChanged < MessageTemplate

  # MessageTemplate::ProjectSettingChanged.get_message_content(User.where(login: 'yystopf'), User.last, Project.last, {description: '测试修改项目简介', category: '大数据', language: 'Ruby', permission: '公有', navbar: '易修, 合并请求'})
  def self.get_message_content(receivers, operator, project, change_params)
    return '', '', '' if change_params.blank?
    owner = project&.owner
    content = sys_notice.gsub('{nickname1}', operator&.nickname).gsub('{nickname2}', owner&.nickname).gsub('{repository}', project&.name)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier)
    # 项目名称更改
    if change_params[:name].present?
      content.sub!('{ifname}', '')
      content.sub!('{endname}', '')
      content.gsub!('{name}', change_params[:name][1])
    else
      content.gsub!(/({ifname})(.*)({endname})/, '') 
    end
    # 项目简介更改
    if change_params[:description].present?
      content.sub!('{ifdescription}', '')
      content.sub!('{enddescription}', '')
      content.gsub!('{description}', change_params[:description][1])
    else 
      content.gsub!(/({ifdescription})(.*)({enddescription})/, '') 
    end
    # 项目类别更改
    if change_params[:project_category_id].present?
      category = ProjectCategory.find_by_id(change_params[:project_category_id][1])
      content.sub!('{ifcategory}', '')
      content.sub!('{endcategory}', '')
      content.gsub!('{category}', category&.name)
    else
      content.gsub!(/({ifcategory})(.*)({endcategory})/, '') 
    end
    # 项目语言更改
    if change_params[:project_language_id].present?
      language = ProjectLanguage.find_by_id(change_params[:project_language_id][1])
      content.sub!('{iflanguage}', '')
      content.sub!('{endlanguage}', '')
      content.gsub!('{language}', language&.name)
    else
      content.gsub!(/({iflanguage})(.*)({endlanguage})/, '') 
    end
    # 项目公私有更改
    if change_params[:is_public].present?
      permission = change_params[:is_public][1] ? '公有' : '私有'
      content.sub!('{ifpermission}', '')
      content.sub!('{endpermission}', '')
      content.gsub!('{permission}', permission)
    else
      content.gsub!(/({ifpermission})(.*)({endpermission})/, '') 
    end
    # 项目导航更改
    if change_params[:navbar].present? 
      navbar = project.project_units.order(unit_type: :asc).pluck(:unit_type).join('，') 
      navbar.gsub!('code，', '')
      navbar.gsub!('issues', '易修')
      navbar.gsub!('pulls', '合并请求')
      navbar.gsub!('wiki', 'Wiki')
      navbar.gsub!('devops', '工作流')
      navbar.gsub!('versions', '里程碑')
      navbar.gsub!('resources', '资源库')
      content.sub!('{ifnavbar}', '')
      content.sub!('{endnavbar}', '')
      content.gsub!('{navbar}', navbar)
    else
      content.gsub!(/({ifnavbar})(.*)({endnavbar})/, '') 
    end
    
    return receivers_string(receivers.where.not(id: operator.id)), content, url
  # rescue => e
  #   Rails.logger.info("MessageTemplate::ProjectSettingChanged.get_message_content [ERROR] #{e}")
  #   return '', '', ''
  end
end
