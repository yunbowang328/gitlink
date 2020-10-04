class ProjectDetail < ApplicationRecord
  belongs_to :project, optional: true
  has_many :attachments, as: :container, dependent: :destroy
end
