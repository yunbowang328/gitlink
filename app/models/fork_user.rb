class ForkUser < ApplicationRecord
  belongs_to :project
  belongs_to :user
  belongs_to :fork_project, class_name: 'Project', foreign_key: :fork_project_id

end
