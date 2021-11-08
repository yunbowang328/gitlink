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

  after_create :incre_project_common, :incre_user_statistic, :incre_platform_statistic
  after_destroy :decre_project_common, :decre_user_statistic, :decre_platform_statistic

  def incre_project_common
    CacheAsyncSetJob.perform_later("project_common_service", {forks: 1}, self.project_id)
  end

  def decre_project_common
    CacheAsyncSetJob.perform_later("project_common_service", {forks: -1}, self.project_id)
  end

  def incre_user_statistic 
    CacheAsyncSetJob.perform_later("user_statistic_service", {fork_count: 1}, self.project&.user_id)
  end

  def decre_user_statistic
    CacheAsyncSetJob.perform_later("user_statistic_service", {fork_count: -1}, self.project&.user_id)
  end

  def incre_platform_statistic
    CacheAsyncSetJob.perform_later("platform_statistic_service", {fork_count: 1})
  end

  def decre_platform_statistic
    CacheAsyncSetJob.perform_later("platform_statistic_service", {fork_count: -1})
  end
end
