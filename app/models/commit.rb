class Commit < ApplicationRecord
  belongs_to :project, foreign_key: :project_id

end