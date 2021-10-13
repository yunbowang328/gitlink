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

class MessageTemplate < ApplicationRecord

  def self.build_init_data
    self.create(type: 'MessageTemplate::FollowedTip', sys_notice: '<b>{nickname}</b> 关注了你', notification_url: '{baseurl}/{login}')
    email_html = File.read("#{email_template_html_dir}/issue_assigned.html")
    self.create(type: 'MessageTemplate::IssueAssigned', sys_notice: '{nickname1}在 <b>{nickname2}/{repository}</b> 指派给你一个易修：<b>{title}</b>', notification_url: '{baseurl}/{owner}/{identifier}/issues/{id}', email: email_html, email_title: '{nickname1} 在 {nickname2}/{repository} 指派给你一个易修')
    self.create(type: 'MessageTemplate::IssueAssignerExpire', sys_notice: '您负责的易修 <b>{title}</b> 已临近截止日期，请尽快处理', notification_url: '{baseurl}/{owner}/{identifier}/issues/{id}')
    self.create(type: 'MessageTemplate::IssueAtme', sys_notice: '<b>{nickname}</b> 在易修 <b>{title}</b> 中@我', notification_url: '{baseurl}/{owner}/{identifier}/issues/{id}')
    self.create(type: 'MessageTemplate::IssueChanged', sys_notice: '在项目 <b>{nickname2}/{repository}</b> 的易修 <b>{title}</b> 中：{ifassigner}{nickname1}将负责人从 <b>{assigner1}</b> 修改为 <b>{assigner2}</b> {endassigner}{ifstatus}{nickname1}将状态从 <b>{status1}</b> 修改为 <b>{status2}</b> {endstatus}{iftracker}{nickname1}将类型从 <b>{tracker1}</b> 修改为 <b>{tracker2}</b> {endtracker}{ifpriority}{nickname1}将优先级从 <b>{priority1}</b> 修改为 <b>{priority2}</b> {endpriority}{ifmilestone}{nickname1}将里程碑从 <b>{milestone1}</b> 修改为 <b>{milestone2}</b> {endmilestone}{iftag}{nickname1}将标记从 <b>{tag1}</b> 修改为 <b>{tag2}</b> {endtag}{ifdoneratio}{nickname1}将完成度从 <b>{doneratio1}</b> 修改为 <b>{doneratio2}</b> {enddoneratio}{ifbranch}{nickname1}将指定分支从 <b>{branch1}</b> 修改为 <b>{branch2}</b> {endbranch}{ifstartdate}{nickname1}将开始日期从 <b>{startdate1}</b> 修改为 <b>{startdate2}</b> {endstartdate}{ifduedate}{nickname1}将结束日期从 <b>{duedate1}</b> 修改为 <b>{duedate2}</b> {endduedate}', notification_url: '{baseurl}/{owner}/{identifier}/issues/{id}')
    self.create(type: 'MessageTemplate::IssueCreatorExpire', sys_notice: '您发布的易修 <b>{title}</b> 已临近截止日期，请尽快处理', notification_url: '{baseurl}/{owner}/{identifier}/issues/{id}')
    self.create(type: 'MessageTemplate::IssueDeleted', sys_notice: '{nickname}已将易修 <b>{title}</b> 删除', notification_url: '')
    self.create(type: 'MessageTemplate::IssueJournal', sys_notice: '{nickname}评论易修{title}：<b>{notes}</b>', notification_url: '{baseurl}/{owner}/{identifier}/issues/{id}')
    self.create(type: 'MessageTemplate::LoginIpTip', sys_notice: '您的账号{nickname}于{login_time)在非常用的IP地址{ip}登录，如非本人操作，请立即修改密码', notification_url: '')
    email_html = File.read("#{email_template_html_dir}/organization_joined.html")
    self.create(type: 'MessageTemplate::OrganizationJoined', sys_notice: '你已加入 <b>{organization}</b> 组织', notification_url: '{baseurl}/{login}', email: email_html, email_title: '你已加入 {organization} 组织')
    email_html = File.read("#{email_template_html_dir}/organization_left.html")
    self.create(type: 'MessageTemplate::OrganizationLeft', sys_notice: '你已被移出 <b>{organization}</b> 组织', notification_url: '', email: email_html, email_title: '你已被移出 {organization} 组织')
    self.create(type: 'MessageTemplate::OrganizationRole', sys_notice: '组织 <b>{organization}</b> 已把你的角色改为 <b>{role}</b>', notification_url: '{baseurl}/{login}')
    self.create(type: 'MessageTemplate::ProjectDeleted', sys_notice: '你关注的仓库{nickname}/{repository}已被删除', notification_url: '')
    self.create(type: 'MessageTemplate::ProjectFollowed', sys_notice: '<b>{nickname}</b> 关注了你管理的仓库', notification_url: '{baseurl}/{login}')
    self.create(type: 'MessageTemplate::ProjectForked', sys_notice: '<b>{nickname1}</b> 复刻了你管理的仓库{nickname1}/{repository1}到{nickname2}/{repository2}', notification_url: '{baseurl}/{owner}/{identifier}')
    email_html = File.read("#{email_template_html_dir}/project_issue.html")
    self.create(type: 'MessageTemplate::ProjectIssue', sys_notice: '{nickname1}在 <b>{nickname2}/{repository}</b> 新建易修：<b>{title}</b>', notification_url: '{baseurl}/{owner}/{identifier}/issues/{id}', email: email_html, email_title: '{nickname1} 在 {nickname2}/{repository} 新建了一个易修')
    email_html = File.read("#{email_template_html_dir}/project_joined.html")
    self.create(type: 'MessageTemplate::ProjectJoined', sys_notice: '你已加入 <b>{repository}</b> 项目', notification_url: '{baseurl}/{owner}/{identifier}', email: email_html, email_title: '你已加入 {repository} 项目')
    email_html = File.read("#{email_template_html_dir}/project_left.html")
    self.create(type: 'MessageTemplate::ProjectLeft', sys_notice: '你已被移出 <b>{repository}</b> 项目', notification_url: '', email: email_html, email_title: '你已被移出 {repository} 项目')
    email_html = File.read("#{email_template_html_dir}/project_member_joined.html")
    self.create(type: 'MessageTemplate::ProjectMemberJoined', sys_notice: '<b>{nickname1}</b> 已加入项目 <b>{nickname2}/{repository}</b>', notification_url: '{baseurl}/{owner}/{identifier}', email: email_html, email_title: '{nickname1} 已加入项目 {nickname2}/{repository}')
    email_html = File.read("#{email_template_html_dir}/project_member_left.html")
    self.create(type: 'MessageTemplate::ProjectMemberLeft', sys_notice: '<b>{nickname1}</b> 已被移出项目 <b>{nickname2}/{repository}</b>', notification_url: '{baseurl}/{owner}/{identifier}', email: email_html, email_title: '{nickname1} 已被移出项目 {nickname2}/{repository}')
    self.create(type: 'MessageTemplate::ProjectMilestone', sys_notice: '{nickname1}在 <b>{nickname2}/{repository}</b> 创建了一个里程碑：<b>{title}</b>', notification_url: '{baseurl}/{owner}/{identifier}/milestones/{id}')
    self.create(type: 'MessageTemplate::ProjectPraised', sys_notice: '<b>{nickname}</b> 点赞了你管理的仓库', notification_url: '{baseurl}/{login}')
    email_html = File.read("#{email_template_html_dir}/project_pull_request.html")
    self.create(type: 'MessageTemplate::ProjectPullRequest', sys_notice: '{nickname1}在 <b>{nickname2}/{repository}</b> 提交了一个合并请求：<b>{title}</b>', notification_url: '{baseurl}/{owner}/{identifier}/pulls/{id}/Messagecount', email: email_html, email_title: '{nickname1} 在 {nickname2}/{repository} 提交了一个合并请求')
    self.create(type: 'MessageTemplate::ProjectRole', sys_notice: '仓库 <b>{repository}</b> 已把你的角色改为 <b>{role}</b>', notification_url: '{baseurl}/{owner}/{identifier}')
    email_html = File.read("#{email_template_html_dir}/project_setting_changed.html")
    self.create(type: 'MessageTemplate::ProjectSettingChanged', sys_notice: '{nickname1}更改了 <b>{nickname2}/{repository}</b> 仓库设置：{ifname}更改项目名称为"<b>{name}</b>"{endname}{ifdescription}更改项目简介为"<b>{description}</b>"{enddescription}{ifcategory}更改项目类别为"<b>{category}</b>"{endcategory}{iflanguage}更改项目语言为"<b>{language}</b>"{endlanguage}{ifpermission}将仓库设为"<b>{permission}</b>"{endpermission}{ifnavbar}将项目导航更改为"<b>{navbar}</b>"{endnavbar}', notification_url: '{baseurl}/{owner}/{identifier}/settings', email: email_html, email_title: '您管理的仓库 {nickname2}/{repository} 仓库设置已被更改')
    self.create(type: 'MessageTemplate::ProjectTransfer', sys_notice: '你关注的仓库{nickname1}/{repository1}已被转移至{nickname2}/{repository2}', notification_url: '{baseurl}/{owner}/{identifier}')
    self.create(type: 'MessageTemplate::ProjectVersion', sys_notice: '{nickname1}在 <b>{nickname2}/{repository}</b> 创建了发行版：<b>{title}</b>', notification_url: '{baseurl}/{owner}/{identifier}/releases')
    email_html = File.read("#{email_template_html_dir}/pull_request_assigned.html")
    self.create(type: 'MessageTemplate::PullRequestAssigned', sys_notice: '{nickname1}在 <b>{nickname2}/{repository}</b> 指派给你一个合并请求：<b>{title}<b>', notification_url: '{baseurl}/{owner}/{identifier}/pulls/{id}/Messagecount', email: email_html, email_title: '{nickname1} 在 {nickname2}/{repository} 指派给你一个合并请求')
    self.create(type: 'MessageTemplate::PullRequestAtme', sys_notice: '<b>{nickname}</b> 在合并请求 <b>{title}</b> 中@我', notification_url: '{baseurl}/{owner}/{identifier}/pulls/{id}/Messagecount')
    self.create(type: 'MessageTemplate::PullRequestChanged', sys_notice: '在项目{nickname2}/{repository}的合并请求 <b>{title}</b> 中：{ifassigner}{nickname1}将审查成员从 <b>{assigner1}</b> 修改为 <b>{assigner2}</b> {endassigner}{ifmilestone}{nickname1}将里程碑从 <b>{milestone1}</b> 修改为 <b>{milestone2}</b> {endmilestone}{iftag}{nickname1}将标记从 <b>{tag1}</b> 修改为 <b>{tag2}</b> {endtag}{ifpriority}{nickname1}将优先级从 <b>{priority1}</b> 修改为 <b>{priority2}</b> {endpriority}', notification_url: '{baseurl}/{owner}/{identifier}/pulls/{id}/Messagecount')
    self.create(type: 'MessageTemplate::PullRequestClosed', sys_notice: '你提交的合并请求：{title} <b>被拒绝</b>', notification_url: '')
    self.create(type: 'MessageTemplate::PullRequestJournal', sys_notice: '{nickname}评论合并请求{title}：<b>{notes}</b>', notification_url: '{baseurl}/{owner}/{identifier}/pulls/{id}/Messagecount')
    self.create(type: 'MessageTemplate::PullRequestMerged', sys_notice: '你提交的合并请求：{title} <b>已通过</b>', notification_url: '{baseurl}/{owner}/{identifier}/pulls/{id}/Messagecount')
  end

  def self.sys_notice
    self.last&.sys_notice
  end

  def self.email 
    self.last&.email
  end

  def self.email_title 
    self.last&.email_title
  end

  def self.notification_url 
    self.last&.notification_url.gsub('{baseurl}', base_url)
  end

  def self.base_url 
    Rails.application.config_for(:configuration)['platform_url']
  end

  def self.receivers_string(receivers)
    receivers.pluck(:id).join(",")
  end

  def self.receivers_email_string(receivers) 
    receivers.pluck(:mail).join(",")
  end

  def self.email_template_html_dir 
    "#{Rails.root}/public/message_template"
  end

  def simple_type 
    self.type.split("::")[-1]
  end
end
