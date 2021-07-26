class Gitea::Webhook < Gitea::Base 
  self.inheritance_column = nil

  self.table_name = 'webhook'
  
  belongs_to :project, class_name: "::Project", primary_key: :gpid, foreign_key: :repo_id, optional: true

  enum hook_task_type: {gogs: 1, slack: 2, gitea: 3, discord: 4, dingtalk: 5, telegram: 6, msteams: 7, feishu: 8, matrix: 9}
  enum last_status: {waiting: 0, succeed: 1, fail: 2}
end