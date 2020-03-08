class Version < ApplicationRecord
  belongs_to :project
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
