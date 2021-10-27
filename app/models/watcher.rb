# == Schema Information
#
# Table name: watchers
#
#  id             :integer          not null, primary key
#  watchable_type :string(255)      default(""), not null
#  watchable_id   :integer          default("0"), not null
#  user_id        :integer
#  created_at     :datetime
#
# Indexes
#
#  index_watchers_on_user_id                          (user_id)
#  index_watchers_on_watchable_id_and_watchable_type  (watchable_id,watchable_type)
#  watchers_user_id_type                              (user_id,watchable_type)
#

class Watcher < ApplicationRecord
  belongs_to :user
  
  belongs_to :watchable, polymorphic: true, counter_cache: :watchers_count

  scope :watching_users, ->(watchable_id){ where("watchable_type = ? and user_id = ?",'User',watchable_id)}

  after_create :send_create_message_to_notice_system, :incre_project_common, :incre_user_statistic, :incre_platform_statistic
  after_destroy :decre_project_common, :decre_user_statistic, :decre_platform_statistic


  def incre_project_common
    CacheAsyncSetJob.perform_later("project_common_service", {watchers: 1}, self.watchable_id) if self.watchable_type == "Project"
  end

  def decre_project_common
    CacheAsyncSetJob.perform_later("project_common_service", {watchers: -1}, self.watchable_id) if self.watchable_type == "Project"
  end

  def incre_user_statistic 
    CacheAsyncSetJob.perform_later("user_statistic_service", {follow_count: 1}, self.watchable_id) if self.watchable_type == "User"
    CacheAsyncSetJob.perform_later("user_statistic_service", {project_watcher_count: 1}, self.watchable&.user_id) if self.watchable_type == "Project"
  end

  def decre_user_statistic
    CacheAsyncSetJob.perform_later("user_statistic_service", {follow_count: -1}, self.watchable_id) if self.watchable_type == "User"
    CacheAsyncSetJob.perform_later("user_statistic_service", {project_watcher_count: -1}, self.watchable&.user_id) if self.watchable_type == "Project"
  end

  def incre_platform_statistic
    CacheAsyncSetJob.perform_later("platform_statistic_service", {follow_count: 1}) if self.watchable_type == "User"
    CacheAsyncSetJob.perform_later("platform_statistic_service", {project_watcher_count: 1}) if self.watchable_type == "Project"
  end

  def decre_platform_statistic
    CacheAsyncSetJob.perform_later("platform_statistic_service", {follow_count: -1}) if self.watchable_type == "User"
    CacheAsyncSetJob.perform_later("platform_statistic_service", {project_watcher_count: -1}) if self.watchable_type == "Project"
  end

  def send_create_message_to_notice_system
    SendTemplateMessageJob.perform_later('FollowTip', self.id) if self.watchable.is_a?(User) if Site.has_notice_menu?
  end

end
