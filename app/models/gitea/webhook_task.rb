class Gitea::WebhookTask < Gitea::Base 
  serialize :payload_content, JSON
  serialize :request_content, JSON
  serialize :response_content, JSON

  self.inheritance_column = nil

  self.table_name = 'hook_task'

  belongs_to :webhook, class_name: "Gitea::Webhook", foreign_key: :hook_id

  enum type: {gogs: 1, slack: 2, gitea: 3, discord: 4, dingtalk: 5, telegram: 6, msteams: 7, feishu: 8, matrix: 9}
end