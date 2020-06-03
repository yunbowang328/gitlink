class Watcher < ApplicationRecord
  belongs_to :user
  
  belongs_to :watchable, polymorphic: true, counter_cache: :watchers_count

  scope :watching_users, ->(watchable_id){ where("watchable_type = ? and user_id = ?",'User',watchable_id)}
end
