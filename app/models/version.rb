# == Schema Information
#
# Table name: versions
#
#  id                  :integer          not null, primary key
#  project_id          :integer          default("0"), not null
#  name                :string(255)      default(""), not null
#  description         :text(65535)
#  effective_date      :date
#  created_on          :datetime
#  updated_on          :datetime
#  wiki_page_title     :string(255)
#  status              :string(255)      default("open")
#  sharing             :string(255)      default("none"), not null
#  user_id             :integer
#  issues_count        :integer          default("0")
#  closed_issues_count :integer          default("0")
#  percent             :float(24)        default("0")
#
# Indexes
#
#  index_versions_on_sharing  (sharing)
#  versions_project_id        (project_id)
#

class Version < ApplicationRecord
  belongs_to :project, counter_cache: true
  has_many :issues, class_name: "Issue", foreign_key: "fixed_version_id"
  belongs_to :user, optional: true

  scope :version_includes, ->{includes(:issues, :user)}

  # def open_issues_count
  #   issues.select(:id,:status_id).where(status_id: [1,2,3,4,6]).size
  # end
  #
  # def close_issues_count
  #   issues.select(:id,:status_id).where(status_id: 5).size
  # end

  def version_user
    User.select(:login, :lastname,:firstname, :nickname)&.find_by_id(self.user_id)
  end

end
