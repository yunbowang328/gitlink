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

# 我创建或负责的疑修状态变更
class MessageTemplate::IssueChanged < MessageTemplate 

  # MessageTemplate::IssueChanged.get_message_content(User.where(login: 'yystopf'), User.last, Issue.last, {status_id: [1, 2], assigned_to_id: [nil, 203], tracker_id: [4, 3], priority_id: [2, 4], fixed_version_id: [nil, 5], due_date: ['', '2021-09-11'], done_ratio: [0, 40], issue_tags_value: ["", "7"], branch_name: ["", "master"]})
  def self.get_message_content(receivers, operator, issue, change_params) 
    receivers.each do |receiver|
      if receiver.user_template_message_setting.present? 
        receivers = receivers.where.not(id: receiver.id) unless receiver.user_template_message_setting.notification_body["CreateOrAssign::IssueChanged"]
      end
    end
    return '', '', '' if receivers.blank?
    return '', '', '' if change_params.blank?
    project = issue&.project 
    owner = project&.owner 
    content = MessageTemplate::IssueChanged.sys_notice.gsub('{nickname1}', operator&.real_name).gsub('{nickname2}', owner&.real_name).gsub('{repository}', project&.name).gsub('{title}', issue&.subject)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', issue&.id.to_s)
    change_count = change_params.keys.size
    # 疑修负责人修改
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
    # 疑修状态修改
    if change_params[:status_id].present?
      status1 = IssueStatus.find_by_id(change_params[:status_id][0])
      status2 = IssueStatus.find_by_id(change_params[:status_id][1])
      if change_count > 1
        content.sub!('{ifstatus}', '<br/>') 
      else
        content.sub!('{ifstatus}', '') 
      end
      content.sub!('{endstatus}', '')
      content.gsub!('{status1}', status1&.name)
      content.gsub!('{status2}', status2&.name)
    else
      content.gsub!(/({ifstatus})(.*)({endstatus})/, '') 
    end
    # 疑修类型修改
    if change_params[:tracker_id].present?
      tracker1 = Tracker.find_by_id(change_params[:tracker_id][0])
      tracker2 = Tracker.find_by_id(change_params[:tracker_id][1])
      if change_count > 1
        content.sub!('{iftracker}', '<br/>')
      else
        content.sub!('{iftracker}', '')
      end
      content.sub!('{endtracker}', '')
      content.gsub!('{tracker1}', tracker1&.name)
      content.gsub!('{tracker2}', tracker2&.name)
    else
      content.gsub!(/({iftracker})(.*)({endtracker})/, '') 
    end
    # 疑修里程碑修改
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
    # 疑修标记修改
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
    # 疑修优先级修改
    if change_params[:priority_id].present?
      priority1 = IssuePriority.find_by_id(change_params[:priority_id][0])
      priority2 = IssuePriority.find_by_id(change_params[:priority_id][1])
      if change_count > 1
        content.sub!('{ifpriority}', '<br/>')
      else
        content.sub!('{ifpriority}', '')
      end
      content.sub!('{endpriority}', '')
      content.gsub!('{priority1}', priority1&.name)
      content.gsub!('{priority2}', priority2&.name)
    else
      content.gsub!(/({ifpriority})(.*)({endpriority})/, '') 
    end
    # 疑修完成度修改
    if change_params[:done_ratio].present?
      doneratio1 = change_params[:done_ratio][0]
      doneratio2 = change_params[:done_ratio][1]
      if change_count > 1
        content.sub!('{ifdoneratio}', '<br/>')
      else
        content.sub!('{ifdoneratio}', '')
      end
      content.sub!('{enddoneratio}', '')
      content.gsub!('{doneratio1}', "#{doneratio1}%")
      content.gsub!('{doneratio2}', "#{doneratio2}%")
    else
      content.gsub!(/({ifdoneratio})(.*)({enddoneratio})/, '') 
    end
    # 疑修指定分支修改
    if change_params[:branch_name].present?
      branch1 = change_params[:branch_name][0].blank? ? '分支未指定' : change_params[:branch_name][0]
      branch2 = change_params[:branch_name][1].blank? ? '分支未指定' : change_params[:branch_name][1]
      if change_count > 1
        content.sub!('{ifbranch}', '<br/>')
      else
        content.sub!('{ifbranch}', '')
      end
      content.sub!('{endbranch}', '')
      content.gsub!('{branch1}', branch1)
      content.gsub!('{branch2}', branch2)
    else
      content.gsub!(/({ifbranch})(.*)({endbranch})/, '') 
    end
    # 疑修开始日期修改
    if change_params[:start_date].present?
      startdate1 = change_params[:start_date][0].blank? ? "未选择开始日期" : change_params[:start_date][0]
      startdate2 = change_params[:start_date][1].blank? ? "未选择开始日期" : change_params[:start_date][1]
      if change_count > 1
        content.sub!('{ifstartdate}', '<br/>')
      else
        content.sub!('{ifstartdate}', '')
      end
      content.sub!('{endstartdate}', '')
      content.gsub!('{startdate1}', startdate1 )
      content.gsub!('{startdate2}', startdate2)
    else
      content.gsub!(/({ifstartdate})(.*)({endstartdate})/, '') 
    end
    # 疑修结束日期修改
    if change_params[:due_date].present?
      duedate1 = change_params[:due_date][0].blank? ? '未选择结束日期' : change_params[:due_date][0]
      duedate2 = change_params[:due_date][1].blank? ? '未选择结束日期' : change_params[:due_date][1]
      if change_count > 1
        content.sub!('{ifduedate}', '<br/>')
      else
        content.sub!('{ifduedate}', '')
      end
      content.sub!('{endduedate}', '')
      content.gsub!('{duedate1}', duedate1)
      content.gsub!('{duedate2}', duedate2)
    else
      content.gsub!(/({ifduedate})(.*)({endduedate})/, '') 
    end
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::IssueAssigned.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, operator, issue, change_params)
    return '', '', '' if change_params.blank?
    if receiver.user_template_message_setting.present? 
      return '', '', '' unless receiver.user_template_message_setting.email_body["CreateOrAssign::IssueChanged"]
      project = issue&.project
      owner = project&.owner 
      title = email_title
      title.gsub!('{title}', issue&.subject)
      content = email
      content.gsub!('{receiver}', receiver&.real_name)
      content.gsub!('{baseurl}', base_url)
      content.gsub!('{login1}', operator&.login)
      content.gsub!('{nickname1}', operator&.real_name)
      content.gsub!('{login2}', owner&.login)
      content.gsub!('{nickname2}', owner&.real_name)
      content.gsub!('{identifier}', project&.identifier)
      content.gsub!('{repository}', project&.name)
      content.gsub!('{title}', issue&.subject)
      content.gsub!('{id}', issue&.id.to_s)
      change_count = change_params.keys.size
      # 疑修负责人修改
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
      # 疑修状态修改
      if change_params[:status_id].present?
        status1 = IssueStatus.find_by_id(change_params[:status_id][0])
        status2 = IssueStatus.find_by_id(change_params[:status_id][1])
        if change_count > 1
          content.sub!('{ifstatus}', '<br/>') 
        else
          content.sub!('{ifstatus}', '') 
        end
        content.sub!('{endstatus}', '')
        content.gsub!('{status1}', status1&.name)
        content.gsub!('{status2}', status2&.name)
      else
        content.gsub!(/({ifstatus})(.*)({endstatus})/, '') 
      end
      # 疑修类型修改
      if change_params[:tracker_id].present?
        tracker1 = Tracker.find_by_id(change_params[:tracker_id][0])
        tracker2 = Tracker.find_by_id(change_params[:tracker_id][1])
        if change_count > 1
          content.sub!('{iftracker}', '<br/>')
        else
          content.sub!('{iftracker}', '')
        end
        content.sub!('{endtracker}', '')
        content.gsub!('{tracker1}', tracker1&.name)
        content.gsub!('{tracker2}', tracker2&.name)
      else
        content.gsub!(/({iftracker})(.*)({endtracker})/, '') 
      end
      # 疑修里程碑修改
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
      # 疑修标记修改
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
      # 疑修优先级修改
      if change_params[:priority_id].present?
        priority1 = IssuePriority.find_by_id(change_params[:priority_id][0])
        priority2 = IssuePriority.find_by_id(change_params[:priority_id][1])
        if change_count > 1
          content.sub!('{ifpriority}', '<br/>')
        else
          content.sub!('{ifpriority}', '')
        end
        content.sub!('{endpriority}', '')
        content.gsub!('{priority1}', priority1&.name)
        content.gsub!('{priority2}', priority2&.name)
      else
        content.gsub!(/({ifpriority})(.*)({endpriority})/, '') 
      end
      # 疑修完成度修改
      if change_params[:done_ratio].present?
        doneratio1 = change_params[:done_ratio][0]
        doneratio2 = change_params[:done_ratio][1]
        if change_count > 1
          content.sub!('{ifdoneratio}', '<br/>')
        else
          content.sub!('{ifdoneratio}', '')
        end
        content.sub!('{enddoneratio}', '')
        content.gsub!('{doneratio1}', "#{doneratio1}%")
        content.gsub!('{doneratio2}', "#{doneratio2}%")
      else
        content.gsub!(/({ifdoneratio})(.*)({enddoneratio})/, '') 
      end
      # 疑修指定分支修改
      if change_params[:branch_name].present?
        branch1 = change_params[:branch_name][0].blank? ? '分支未指定' : change_params[:branch_name][0]
        branch2 = change_params[:branch_name][1].blank? ? '分支未指定' : change_params[:branch_name][1]
        if change_count > 1
          content.sub!('{ifbranch}', '<br/>')
        else
          content.sub!('{ifbranch}', '')
        end
        content.sub!('{endbranch}', '')
        content.gsub!('{branch1}', branch1)
        content.gsub!('{branch2}', branch2)
      else
        content.gsub!(/({ifbranch})(.*)({endbranch})/, '') 
      end
      # 疑修开始日期修改
      if change_params[:start_date].present?
        startdate1 = change_params[:start_date][0].blank? ? "未选择开始日期" : change_params[:start_date][0]
        startdate2 = change_params[:start_date][1].blank? ? "未选择开始日期" : change_params[:start_date][1]
        if change_count > 1
          content.sub!('{ifstartdate}', '<br/>')
        else
          content.sub!('{ifstartdate}', '')
        end
        content.sub!('{endstartdate}', '')
        content.gsub!('{startdate1}', startdate1 )
        content.gsub!('{startdate2}', startdate2)
      else
        content.gsub!(/({ifstartdate})(.*)({endstartdate})/, '') 
      end
      # 疑修结束日期修改
      if change_params[:due_date].present?
        duedate1 = change_params[:due_date][0].blank? ? '未选择结束日期' : change_params[:due_date][0]
        duedate2 = change_params[:due_date][1].blank? ? '未选择结束日期' : change_params[:due_date][1]
        if change_count > 1
          content.sub!('{ifduedate}', '<br/>')
        else
          content.sub!('{ifduedate}', '')
        end
        content.sub!('{endduedate}', '')
        content.gsub!('{duedate1}', duedate1)
        content.gsub!('{duedate2}', duedate2)
      else
        content.gsub!(/({ifduedate})(.*)({endduedate})/, '') 
      end

      return receiver&.mail, title, content
    else
      return '', '', ''
    end
    
  rescue => e
    Rails.logger.info("MessageTemplate::IssueChanged.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
