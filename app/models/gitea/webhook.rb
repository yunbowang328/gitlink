class Gitea::Webhook < Gitea::Base 
  serialize :events, JSON
  self.inheritance_column = nil

  self.table_name = 'webhook'
  
  has_many :tasks, class_name: "Gitea::WebhookTask", foreign_key: :hook_id
  belongs_to :project, class_name: "::Project", primary_key: :gpid, foreign_key: :repo_id, optional: true

  enum hook_task_type: {gogs: 1, slack: 2, gitea: 3, discord: 4, dingtalk: 5, telegram: 6, msteams: 7, feishu: 8, matrix: 9}
  enum last_status: {waiting: 0, succeed: 1, fail: 2}
  enum content_type: {json: 1, form: 2}
end