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
  json.commit entry['commit']
end
