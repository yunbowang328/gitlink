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

# 我创建或负责的合并请求状态变更
class MessageTemplate::PullRequestChanged < MessageTemplate

  # MessageTemplate::PullRequestChanged.get_message_content(User.where(login: 'yystopf'), User.last, PullRequest.last, {assigner: 'testforge2', tag: '标签', priority: '低'})
  def self.get_message_content(receivers, operator, pull_request, change_params)
    project = pull_request&.project 
    owner = project&.owner 
    issue = pull_request&.issue
    content = sys_notice.gsub('{nickname1}', operator&.nickname).gsub('{nickname2}', owner&.nickname).gsub('{repository}', project&.name)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', pull_request&.id.to_s)
    # 合并请求审查成员修改
    if change_params[:assigner].present?
      assigner = issue&.get_assign_user&.nickname || '未指派成员'
      content.sub!('{ifassigner}', '')
      content.sub!('{endassigner}', '')
      content.gsub!('{assigner1}', assigner)
      content.gsub!('{assigner2}', change_params[:assigner])
    else
      content.gsub!(/({ifassigner})(.*)({endassigner})/, '') 
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
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::PullRequestChanged.get_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
