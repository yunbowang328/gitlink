
json.last_commit do
  if @latest_commit
    json.partial! 'commit', commit: @latest_commit, project: @project
  else
    json.nil!
  end
end
json.entries do
  json.array! @sub_entries do |entry|
    json.partial! 'repositories/simple_entry', locals: { entry: entry }
  end
end
