
json.last_commit do
  if @latest_commit
    json.partial! 'commit', commit: @latest_commit, project: @project
  else
    json.nil!
  end
end
json.tags_count @tags_count
json.branches_count @branches_count
json.commits_count @commits_count
json.entries do
  json.array! @sub_entries do |entry|
    json.partial! 'repositories/simple_entry', locals: { entry: entry }
  end
end
