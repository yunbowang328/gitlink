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
#  email_title      :string(255)
#

# 我管理的仓库项目设置被更改
class MessageTemplate::ProjectSettingChanged < MessageTemplate

  # MessageTemplate::ProjectSettingChanged.get_message_content(User.where(login: 'yystopf'), User.last, Project.last, {description: '测试修改项目简介', category: '大数据', language: 'Ruby', permission: '公有', navbar: '易修, 合并请求'})
  def self.get_message_content(receivers, operator, project, change_params)
    receivers.each do |receiver|
      if receiver.user_template_message_setting.present? 
        receivers = receivers.where.not(id: receiver.id) unless receiver.user_template_message_setting.notification_body["ManageProject::SettingChanged"]
      end
    end
    return '', '', '' if receivers.blank?
    return '', '', '' if change_params.blank?
    owner = project&.owner
    content = sys_notice.gsub('{nickname1}', operator&.real_name).gsub('{nickname2}', owner&.real_name).gsub('{repository}', project&.name)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier)
    change_count = change_params.keys.size
    # 项目名称更改
    if change_params[:name].present?
      if change_count > 1
        content.sub!('{ifname}', '<br/>') 
      else
        content.sub!('{ifname}', '') 
      end
      content.sub!('{endname}', '')
      content.gsub!('{name}', change_params[:name][1])
    else
      content.gsub!(/({ifname})(.*)({endname})/, '') 
    end
    # 项目标识更改
    if change_params[:identifier].present?
      if change_count > 1
        content.sub!('{ifidentifier}', '<br/>') 
      else
        content.sub!('{ifidentifier}', '') 
      end
      content.sub!('{endidentifier}', '')
      content.gsub!('{identifier}', change_params[:identifier][1])
    else
      content.gsub!(/({ifidentifier})(.*)({endidentifier})/, '') 
    end
    # 项目简介更改
    if change_params[:description].present?
      if change_params[:description][1].blank?
        if change_count > 1
          content.gsub!(/({ifdescription})(.*)({enddescription})/, '<br/>删除了项目简介') 
        else
          content.gsub!(/({ifdescription})(.*)({enddescription})/, '删除了项目简介') 
        end
      else
        if change_count > 1
          content.sub!('{ifdescription}', '<br/>') 
        else
          content.sub!('{ifdescription}', '') 
        end
        content.sub!('{enddescription}', '')
        content.gsub!('{description}', change_params[:description][1])
      end
    else 
      content.gsub!(/({ifdescription})(.*)({enddescription})/, '') 
    end
    # 项目类别更改
    if change_params[:project_category_id].present?
      category = ProjectCategory.find_by_id(change_params[:project_category_id][1])
      if category.present? 
        if change_count > 1
          content.sub!('{ifcategory}', '<br/>') 
        else
          content.sub!('{ifcategory}', '') 
        end
        content.sub!('{endcategory}', '')
        content.gsub!('{category}', category&.name)
      else 
        if change_count > 1
          content.gsub!(/({ifcategory})(.*)({endcategory})/, '<br/>删除了项目类别') 
        else
          content.gsub!(/({ifcategory})(.*)({endcategory})/, '删除了项目类别') 
        end
      end
    else
      content.gsub!(/({ifcategory})(.*)({endcategory})/, '') 
    end
    # 项目语言更改
    if change_params[:project_language_id].present?
      language = ProjectLanguage.find_by_id(change_params[:project_language_id][1])
      if language.present?
        if change_count > 1
          content.sub!('{iflanguage}', '<br/>') 
        else
          content.sub!('{iflanguage}', '') 
        end
        content.sub!('{endlanguage}', '')
        content.gsub!('{language}', language&.name)
      else
        if change_count > 1
          content.gsub!(/({iflanguage})(.*)({endlanguage})/, '<br/>删除了项目语言') 
        else
          content.gsub!(/({iflanguage})(.*)({endlanguage})/, '删除了项目语言') 
        end
      end
    else
      content.gsub!(/({iflanguage})(.*)({endlanguage})/, '') 
    end
    # 项目公私有更改
    if change_params[:is_public].present?
      permission = change_params[:is_public][1] ? '公有' : '私有'
      if change_count > 1
        content.sub!('{ifpermission}', '<br/>') 
      else
        content.sub!('{ifpermission}', '') 
      end
      content.sub!('{endpermission}', '')
      content.gsub!('{permission}', permission)
    else
      content.gsub!(/({ifpermission})(.*)({endpermission})/, '') 
    end
    # 项目导航更改
    if change_params[:navbar].present? 
      unit_types = project.project_units.order(unit_type: :asc).pluck(:unit_type)
      unit_types.delete('code')
      unit_types.unshift('代码库')
      unit_types.unshift('主页')
      unit_types.append('动态')
      navbar = unit_types.join('，') 
      navbar.gsub!('issues', '易修')
      navbar.gsub!('pulls', '合并请求')
      navbar.gsub!('wiki', 'Wiki')
      navbar.gsub!('devops', '工作流')
      navbar.gsub!('versions', '里程碑')
      navbar.gsub!('resources', '资源库')
      if change_count > 1
        content.sub!('{ifnavbar}', '<br/>') 
      else
        content.sub!('{ifnavbar}', '') 
      end
      content.sub!('{endnavbar}', '')
      content.gsub!('{navbar}', navbar)
    else
      content.gsub!(/({ifnavbar})(.*)({endnavbar})/, '') 
    end
    
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectSettingChanged.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, operator, project, change_params)
    return '', '', '' if change_params.blank?
    if receiver.user_template_message_setting.present? 
      return '', '', '' unless receiver.user_template_message_setting.email_body["ManageProject::SettingChanged"]
      owner = project&.owner
      title = email_title
      title.gsub!('{nickname2}', owner&.real_name)
      title.gsub!('{repository}', project&.name)
  
      content = email 
      content.gsub!('{receiver}', receiver&.real_name)
      content.gsub!('{baseurl}', base_url)
      content.gsub!('{login1}', operator&.login)
      content.gsub!('{nickname1}', operator&.real_name)
      content.gsub!('{login2}', owner&.login)
      content.gsub!('{nickname2}', owner&.real_name)
      content.gsub!('{identifier}', project&.identifier)
      content.gsub!('{repository}', project&.name)
      change_count = change_params.keys.size
      # 项目名称更改
      if change_params[:name].present?
        if change_count > 1
          content.sub!('{ifname}', '<br/>') 
        else
          content.sub!('{ifname}', '') 
        end
        content.sub!('{endname}', '')
        content.gsub!('{name}', change_params[:name][1])
      else
        content.gsub!(/({ifname})(.*)({endname})/, '') 
      end
      # 项目标识更改
      if change_params[:identifier].present?
        if change_count > 1
          content.sub!('{ifidentifier}', '<br/>') 
        else
          content.sub!('{ifidentifier}', '') 
        end
        content.sub!('{endidentifier}', '')
        content.gsub!('{identifier}', change_params[:identifier][1])
      else
        content.gsub!(/({ifidentifier})(.*)({endidentifier})/, '') 
      end
      # 项目简介更改
      if change_params[:description].present?
        if change_params[:description][1].blank?
          if change_count > 1
            content.gsub!(/({ifdescription})(.*)({enddescription})/, '<br/>删除了项目简介') 
          else
            content.gsub!(/({ifdescription})(.*)({enddescription})/, '删除了项目简介') 
          end
        else
          if change_count > 1
            content.sub!('{ifdescription}', '<br/>') 
          else
            content.sub!('{ifdescription}', '') 
          end
          content.sub!('{enddescription}', '')
          content.gsub!('{description}', change_params[:description][1])
        end
      else 
        content.gsub!(/({ifdescription})(.*)({enddescription})/, '') 
      end
      # 项目类别更改
      if change_params[:project_category_id].present?
        category = ProjectCategory.find_by_id(change_params[:project_category_id][1])
        if category.present? 
          if change_count > 1
            content.sub!('{ifcategory}', '<br/>') 
          else
            content.sub!('{ifcategory}', '') 
          end
          content.sub!('{endcategory}', '')
          content.gsub!('{category}', category&.name)
        else 
          if change_count > 1
            content.gsub!(/({ifcategory})(.*)({endcategory})/, '<br/>删除了项目类别') 
          else
            content.gsub!(/({ifcategory})(.*)({endcategory})/, '删除了项目类别') 
          end
        end
      else
        content.gsub!(/({ifcategory})(.*)({endcategory})/, '') 
      end
      # 项目语言更改
      if change_params[:project_language_id].present?
        language = ProjectLanguage.find_by_id(change_params[:project_language_id][1])
        if language.present?
          if change_count > 1
            content.sub!('{iflanguage}', '<br/>') 
          else
            content.sub!('{iflanguage}', '') 
          end
          content.sub!('{endlanguage}', '')
          content.gsub!('{language}', language&.name)
        else
          if change_count > 1
            content.gsub!(/({iflanguage})(.*)({endlanguage})/, '<br/>删除了项目语言') 
          else
            content.gsub!(/({iflanguage})(.*)({endlanguage})/, '删除了项目语言') 
          end
        end
      else
        content.gsub!(/({iflanguage})(.*)({endlanguage})/, '') 
      end
      # 项目公私有更改
      if change_params[:is_public].present?
        permission = change_params[:is_public][1] ? '公有' : '私有'
        if change_count > 1
          content.sub!('{ifpermission}', '<br/>') 
        else
          content.sub!('{ifpermission}', '') 
        end
        content.sub!('{endpermission}', '')
        content.gsub!('{permission}', permission)
      else
        content.gsub!(/({ifpermission})(.*)({endpermission})/, '') 
      end
      # 项目导航更改
      if change_params[:navbar].present? 
        unit_types = project.project_units.order(unit_type: :asc).pluck(:unit_type)
        unit_types.delete('code')
        unit_types.unshift('代码库')
        unit_types.unshift('主页')
        unit_types.append('动态')
        navbar = unit_types.join('，') 
        navbar.gsub!('issues', '易修')
        navbar.gsub!('pulls', '合并请求')
        navbar.gsub!('wiki', 'Wiki')
        navbar.gsub!('devops', '工作流')
        navbar.gsub!('versions', '里程碑')
        navbar.gsub!('resources', '资源库')
        if change_count > 1
          content.sub!('{ifnavbar}', '<br/>') 
        else
          content.sub!('{ifnavbar}', '') 
        end
        content.sub!('{endnavbar}', '')
        content.gsub!('{navbar}', navbar)
      else
        content.gsub!(/({ifnavbar})(.*)({endnavbar})/, '') 
      end
      
      return receiver&.mail, title, content
    else
      return '', '', '' 
    end
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectSettingChanged.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
