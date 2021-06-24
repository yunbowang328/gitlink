class Gitea::Pull < Gitea::Base
  self.inheritance_column = nil # FIX  The single-table inheritance mechanism failed
  # establish_connection :gitea_db
  
  self.table_name = "pull_request"

  serialize :conflicted_files, Array

  belongs_to :pull_request, class_name: '::PullRequest', foreign_key: :id, primary_key: :gpid, optional: true

end
