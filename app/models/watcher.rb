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

  after_save :reset_cache_data
  after_destroy :reset_cache_data

  def reset_cache_data 
    if self.watchable.is_a?(User)
      self.reset_user_cache_async_job(self.watchable)
    end
    if self.watchable.is_a?(Project)
      self.reset_user_cache_async_job(self.watchable&.owner)
    end
    self.reset_platform_cache_async_job
  end

end
