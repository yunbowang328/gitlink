class IssueTag < ApplicationRecord

  has_many :issue_tags_relates, dependent: :destroy
  has_many :issues, through: :issue_tags_relates
  belongs_to :project, optional: true

end
