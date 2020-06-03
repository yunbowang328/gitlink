json.last_commit do
  if @latest_commit
    json.partial! 'commit', commit: @latest_commit, project: @project
  else
    json.nil!
  end
end
json.entries do
  json.array! @entries do |entry|
    json.name entry['name']
    json.path entry['path']
    json.sha entry['sha']
    json.type entry['type']
    json.size entry['size']
    json.content entry['content']
    json.target entry['target']
    if entry['latest_commit']
      json.partial! 'last_commit', entry: entry
    end
  end
end
