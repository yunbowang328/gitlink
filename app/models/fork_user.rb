class ForkUser < ApplicationRecord
  belongs_to :project
  belongs_to :user
  belongs_to :fork_project, class_name: 'ForkUser', foreign_key: :fork_project_id

end
