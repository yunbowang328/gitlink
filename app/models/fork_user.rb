# == Schema Information
#
# Table name: fork_users
#
#  id              :integer          not null, primary key
#  project_id      :integer
#  fork_project_id :integer
#  user_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_fork_users_on_project_id  (project_id)
#  index_fork_users_on_user_id     (user_id)
#

class ForkUser < ApplicationRecord
  belongs_to :project
  belongs_to :user
  belongs_to :fork_project, class_name: 'Project', foreign_key: :fork_project_id

  after_save :reset_cache_data
  after_destroy :reset_cache_data

  def reset_cache_data 
    CacheAsyncResetJob.perform_later("platform_statistic_service")
    CacheAsyncResetJob.perform_later("user_statistic_service", self.project&.user_id)
  end

end
