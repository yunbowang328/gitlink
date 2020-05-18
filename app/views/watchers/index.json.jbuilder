json.total_count @scopes_size
json.watchers do
  json.partial! 'watcher', collection: @watchers, as: :watcher
end
