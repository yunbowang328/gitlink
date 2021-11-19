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

# 我创建或负责的合并请求状态变更
class MessageTemplate::PullRequestChanged < MessageTemplate

  # MessageTemplate::PullRequestChanged.get_message_content(User.where(login: 'yystopf'), User.last, PullRequest.last, {assigned_to_id: [nil, 203], priority_id: [2, 4], fixed_version_id: [nil, 5], issue_tags_value: ["", "7"]})
  def self.get_message_content(receivers, operator, pull_request, change_params)
    receivers.each do |receiver|
      if receiver.user_template_message_setting.present? 
        receivers = receivers.where.not(id: receiver.id) unless receiver.user_template_message_setting.notification_body["CreateOrAssign::PullRequestChanged"]
      end
    end
    return '', '', '' if receivers.blank?
    return '', '', '' if change_params.blank?
    project = pull_request&.project 
    owner = project&.owner 
    issue = pull_request&.issue
    content = sys_notice.gsub('{nickname1}', operator&.real_name).gsub('{nickname2}', owner&.real_name).gsub('{repository}', project&.name).gsub("{title}", pull_request&.title)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', pull_request&.id.to_s)
    change_count = change_params.keys.size
    # 合并请求审查成员修改
    if change_params[:assigned_to_id].present?
      assigner1 = User.find_by_id(change_params[:assigned_to_id][0])
      assigner2 = User.find_by_id(change_params[:assigned_to_id][1])      
      if change_count > 1
        content.sub!('{ifassigner}', '<br/>') 
      else
        content.sub!('{ifassigner}', '') 
      end
      content.sub!('{endassigner}', '')
      content.gsub!('{assigner1}', assigner1.present? ? assigner1&.real_name : '未指派成员')
      content.gsub!('{assigner2}', assigner2.present? ? assigner2&.real_name : '未指派成员')
    else
      content.gsub!(/({ifassigner})(.*)({endassigner})/, '') 
    end
    # 合并请求里程碑修改
    if change_params[:fixed_version_id].present?
      fix_version1 = Version.find_by_id(change_params[:fixed_version_id][0])
      fix_version2 = Version.find_by_id(change_params[:fixed_version_id][1])
      if change_count > 1
        content.sub!('{ifmilestone}', '<br/>') 
      else
        content.sub!('{ifmilestone}', '') 
      end
      content.sub!('{endmilestone}', '')
      content.gsub!('{milestone1}', fix_version1.present? ? fix_version1&.name : '未选择里程碑')
      content.gsub!('{milestone2}', fix_version2.present? ? fix_version2&.name : '未选择里程碑')
    else
      content.gsub!(/({ifmilestone})(.*)({endmilestone})/, '') 
    end
    # 合并请求标记修改
    if change_params[:issue_tags_value].present?
      issue_tags1 = IssueTag.where(id: change_params[:issue_tags_value][0]).distinct
      issue_tags2 = IssueTag.where(id: change_params[:issue_tags_value][1]).distinct
      tag1 = issue_tags1.pluck(:name).join(",").blank? ? '未选择标记' : issue_tags1.pluck(:name).join(",")
      tag2 = issue_tags2.pluck(:name).join(",").blank? ? '未选择标记' : issue_tags2.pluck(:name).join(",")
      if change_count > 1
        content.sub!('{iftag}', '<br/>') 
      else
        content.sub!('{iftag}', '') 
      end
      content.sub!('{endtag}', '')
      content.gsub!('{tag1}', tag1)
      content.gsub!('{tag2}', tag2)
    else
      content.gsub!(/({iftag})(.*)({endtag})()/, '') 
    end
    # 合并请求优先级修改
    if change_params[:priority_id].present?
      priority1 = IssuePriority.find_by_id(change_params[:priority_id][0])
      priority2 = IssuePriority.find_by_id(change_params[:priority_id][1])
      if change_count > 1
        content.sub!('{ifpriority}', '<br/>') 
      else
        content.sub!('{ifpriority}', '') 
      end
      content.sub!('{ifpriority}', '')
      content.sub!('{endpriority}', '')
      content.gsub!('{priority1}', priority1&.name)
      content.gsub!('{priority2}', priority2&.name)
    else
      content.gsub!(/({ifpriority})(.*)({endpriority})/, '') 
    end
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::PullRequestChanged.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, operator, pull_request, change_params)
    if receiver.user_template_message_setting.present? 
      return '', '', '' unless receiver.user_template_message_setting.email_body["CreateOrAssign::PullRequestChanged"]
      project = pull_request&.project
      owner = project&.owner 
      title = email_title
      title.gsub!('{title}', pull_request&.title)
      content = email
      content.gsub!('{receiver}', receiver&.real_name)
      content.gsub!('{nickname1}', operator&.real_name)
      content.gsub!('{login1}', operator&.login)
      content.gsub!('{nickname2}', owner&.real_name)
      content.gsub!('{login2}', owner&.login)
      content.gsub!('{identifier}', project&.identifier)
      content.gsub!('{repository}', project&.name)
      content.gsub!('{baseurl}', base_url)
      content.gsub!('{title}', pull_request&.title)
      content.gsub!('{id}', pull_request&.id.to_s)
  
      change_count = change_params.keys.size
      # 合并请求审查成员修改
      if change_params[:assigned_to_id].present?
        assigner1 = User.find_by_id(change_params[:assigned_to_id][0])
        assigner2 = User.find_by_id(change_params[:assigned_to_id][1])      
        if change_count > 1
          content.sub!('{ifassigner}', '<br/>') 
        else
          content.sub!('{ifassigner}', '') 
        end
        content.sub!('{endassigner}', '')
        content.gsub!('{assigner1}', assigner1.present? ? assigner1&.real_name : '未指派成员')
        content.gsub!('{assigner2}', assigner2.present? ? assigner2&.real_name : '未指派成员')
      else
        content.gsub!(/({ifassigner})(.*)({endassigner})/, '') 
      end
      # 合并请求里程碑修改
      if change_params[:fixed_version_id].present?
        fix_version1 = Version.find_by_id(change_params[:fixed_version_id][0])
        fix_version2 = Version.find_by_id(change_params[:fixed_version_id][1])
        if change_count > 1
          content.sub!('{ifmilestone}', '<br/>') 
        else
          content.sub!('{ifmilestone}', '') 
        end
        content.sub!('{endmilestone}', '')
        content.gsub!('{milestone1}', fix_version1.present? ? fix_version1&.name : '未选择里程碑')
        content.gsub!('{milestone2}', fix_version2.present? ? fix_version2&.name : '未选择里程碑')
      else
        content.gsub!(/({ifmilestone})(.*)({endmilestone})/, '') 
      end
      # 合并请求标记修改
      if change_params[:issue_tags_value].present?
        issue_tags1 = IssueTag.where(id: change_params[:issue_tags_value][0]).distinct
        issue_tags2 = IssueTag.where(id: change_params[:issue_tags_value][1]).distinct
        tag1 = issue_tags1.pluck(:name).join(",").blank? ? '未选择标记' : issue_tags1.pluck(:name).join(",")
        tag2 = issue_tags2.pluck(:name).join(",").blank? ? '未选择标记' : issue_tags2.pluck(:name).join(",")
        if change_count > 1
          content.sub!('{iftag}', '<br/>') 
        else
          content.sub!('{iftag}', '') 
        end
        content.sub!('{endtag}', '')
        content.gsub!('{tag1}', tag1)
        content.gsub!('{tag2}', tag2)
      else
        content.gsub!(/({iftag})(.*)({endtag})()/, '') 
      end
      # 合并请求优先级修改
      if change_params[:priority_id].present?
        priority1 = IssuePriority.find_by_id(change_params[:priority_id][0])
        priority2 = IssuePriority.find_by_id(change_params[:priority_id][1])
        if change_count > 1
          content.sub!('{ifpriority}', '<br/>') 
        else
          content.sub!('{ifpriority}', '') 
        end
        content.sub!('{ifpriority}', '')
        content.sub!('{endpriority}', '')
        content.gsub!('{priority1}', priority1&.name)
        content.gsub!('{priority2}', priority2&.name)
      else
        content.gsub!(/({ifpriority})(.*)({endpriority})/, '') 
      end
  
      return receiver&.mail, title, content
    else
      return '', '', ''
    end

  rescue => e
    Rails.logger.info("MessageTemplate::PullRequestChanged.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
