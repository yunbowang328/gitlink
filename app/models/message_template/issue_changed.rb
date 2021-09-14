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

# 我创建或负责的易修状态变更
class MessageTemplate::IssueChanged < MessageTemplate 

  # MessageTemplate::IssueChanged.get_message_content(User.where(login: 'yystopf'), User.last, Issue.last, {assigner: 'testforge2', milestone: '里程碑', tag: '标签', priority: '低', tracker: '支持', doneratio: '70', branch: 'master', startdate: Date.today, duedate: Date.today + 1.days})
  def self.get_message_content(receivers, operator, issue, change_params) 
    project = issue&.project 
    owner = project&.owner 
    content = MessageTemplate::IssueChanged.sys_notice.gsub('{nickname1}', operator&.nickname).gsub('{nickname2}', owner&.nickname).gsub('{repository}', project&.name).gsub('{title}', issue&.subject)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', issue&.id.to_s)
    # 易修负责人修改
    if change_params[:assigner].present?
      assigner = issue&.get_assign_user&.nickname || '未指派成员'
      content.sub!('{ifassigner}', '')
      content.sub!('{endassigner}', '')
      content.gsub!('{assigner1}', assigner)
      content.gsub!('{assigner2}', change_params[:assigner])
    else
      content.gsub!(/({ifassigner})(.*)({endassigner})/, '') 
    end
    # 易修状态修改
    if change_params[:status].present?
      status = issue&.issue_status&.name
      content.sub!('{ifstatus}', '')
      content.sub!('{endstatus}', '')
      content.gsub!('{status1}', status)
      content.gsub!('{status2}', change_params[:status])
    else
      content.gsub!(/({ifstatus})(.*)({endstatus})/, '') 
    end
    # 易修类型修改
    if change_params[:tracker].present?
      tracker = issue&.tracker&.name
      content.sub!('{iftracker}', '')
      content.sub!('{endtracker}', '')
      content.gsub!('{tracker1}', tracker)
      content.gsub!('{tracker2}', change_params[:tracker])
    else
      content.gsub!(/({iftracker})(.*)({endtracker})/, '') 
    end
    # 合并请求里程碑修改
    if change_params[:milestone].present?
      milestone = issue&.version&.name || '未选择里程碑'
      content.sub!('{ifmilestone}', '')
      content.sub!('{endmilestone}', '')
      content.gsub!('{milestone1}', milestone)
      content.gsub!('{milestone2}', change_params[:milestone])
    else
      content.gsub!(/({ifmilestone})(.*)({endmilestone})/, '') 
    end
    # 合并请求标签修改
    if change_params[:tag].present?
      tag = issue&.issue_tags.distinct.pluck(:name).join(",")
      tag = '未选择标签' if tag == ''
      content.sub!('{iftag}', '')
      content.sub!('{endtag}', '')
      content.gsub!('{tag1}', tag)
      content.gsub!('{tag2}', change_params[:tag])
    else
      content.gsub!(/({iftag})(.*)({endtag})()/, '') 
    end
    # 合并请求优先级修改
    if change_params[:priority].present?
      priority = issue&.priority&.name
      content.sub!('{ifpriority}', '')
      content.sub!('{endpriority}', '')
      content.gsub!('{priority1}', priority)
      content.gsub!('{priority2}', change_params[:priority])
    else
      content.gsub!(/({ifpriority})(.*)({endpriority})/, '') 
    end
    # 易修完成度修改
    if change_params[:doneratio].present?
      doneratio = issue&.done_ratio
      content.sub!('{ifdoneratio}', '')
      content.sub!('{enddoneratio}', '')
      content.gsub!('{doneratio1}', "#{doneratio}%")
      content.gsub!('{doneratio2}', "#{change_params[:doneratio]}%")
    else
      content.gsub!(/({ifdoneratio})(.*)({enddoneratio})/, '') 
    end
    # 易修指定分支修改
    if change_params[:branch].present?
      branch = issue&.branch_name || '分支未指定'
      content.sub!('{ifbranch}', '')
      content.sub!('{endbranch}', '')
      content.gsub!('{branch1}', branch )
      content.gsub!('{branch2}', change_params[:branch])
    else
      content.gsub!(/({ifbranch})(.*)({endbranch})/, '') 
    end
    # 易修开始日期修改
    if change_params[:startdate].present?
      startdate = issue&.start_date || "未选择开始日期"
      content.sub!('{ifstartdate}', '')
      content.sub!('{endstartdate}', '')
      content.gsub!('{startdate1}', startdate.to_s )
      content.gsub!('{startdate2}', change_params[:startdate].to_s)
    else
      content.gsub!(/({ifstartdate})(.*)({endstartdate})/, '') 
    end
    # 易修结束日期修改
    if change_params[:duedate].present?
      duedate = issue&.due_date || '未选择结束日期'
      content.sub!('{ifduedate}', '')
      content.sub!('{endduedate}', '')
      content.gsub!('{duedate1}', duedate.to_s)
      content.gsub!('{duedate2}', change_params[:duedate].to_s)
    else
      content.gsub!(/({ifduedate})(.*)({endduedate})/, '') 
    end
    return receivers_string(receivers), content, url
  # rescue => e
  #   Rails.logger.info("MessageTemplate::IssueAssigned.get_message_content [ERROR] #{e}")
  #   return '', '', ''
  end
end
