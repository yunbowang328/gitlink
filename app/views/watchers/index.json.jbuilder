json.total_count @watchers.size
json.watchers do
  json.partial! 'watcher', collection: @watchers, as: :watcher
end
