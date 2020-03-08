class Watcher < ApplicationRecord
  belongs_to :user
  belongs_to :watchable, polymorphic: true, counter_cache: :watchers_count
end
