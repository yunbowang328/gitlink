# == Schema Information
#
# Table name: issue_tags
#
#  id           :integer          not null, primary key
#  name         :string(255)
#  description  :string(255)
#  color        :string(255)
#  user_id      :integer
#  project_id   :integer
#  issues_count :integer          default("0")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  gid          :integer
#  gitea_url    :string(255)
#
# Indexes
#
#  index_issue_tags_on_user_id_and_name_and_project_id  (user_id,name,project_id)
#

class IssueTag < ApplicationRecord

  has_many :issue_tags_relates, dependent: :destroy
  has_many :issues, through: :issue_tags_relates
  belongs_to :project, optional: true, counter_cache: true

end
