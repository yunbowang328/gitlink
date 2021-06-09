json.count @watchers_count
json.users do 
  json.array! @watchers do |watcher|
    json.partial! "/users/watch_user_detail", target: watcher, user: watcher.watchable
  end
  # json.partial! "/users/watch_user_detail", collection: @watchers, as: :target
end