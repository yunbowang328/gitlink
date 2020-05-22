json.array! @entries do |entry|
  # json.name entry['name']
  # json.path entry['path']
  # json.sha entry['sha']
  # json.type entry['type']
  # json.size entry['size']
  # json.content entry['content']
  # json.target entry['target']
  # json.commit entry['commit']

  if entry['name'] == "README.md"
    readme_md = Gitea::Repository::Entries::GetService.new(@project.owner, @project.identifier, entry['path'], ref:@ref).call
    json.name readme_md['name']
    json.path readme_md['path']
    json.sha readme_md['sha']
    json.type readme_md['type']
    json.size readme_md['size']
    json.content readme_md['content'].present? ? render_decode64_content(readme_md['content']).force_encoding('UTF-8') : ""
    json.target readme_md['target']
  else
    json.name entry['name']
    json.path entry['path']
    json.sha entry['sha']
    json.type entry['type']
    json.size entry['size']
    json.content entry['content']
    json.target entry['target']
  end

  if entry['latest_commit']
    created_at = Time.at(entry['latest_commit']['created_at'].to_i).strftime("%Y-%m-%d %H:%M")
    json.commit do
      json.message entry['latest_commit']['message']
      json.sha entry['latest_commit']['sha']
      json.created_at fix_time entry['latest_commit']
      json.time_from_now time_from_now(created_at)
      json.created_at_unix entry['latest_commit']['created_at']
    end
  end
end
