if @project.forge?
  file_name = entry['name']
  file_type = file_name.to_s.split(".").last
  direct_download = download_type(file_type)
  image_type = image_type?(file_type)
  json.name file_name
  json.sha entry['sha']
  json.path entry['path']
  json.type entry['type']
  json.size entry['size']
  json.content entry['content'].present? && !direct_download ? render_decode64_content(entry['content']) : ""
  json.target entry['target']
  json.download_url entry['download_url']
  json.direct_download direct_download
  json.image_type image_type
  json.is_readme_file is_readme_type?(file_name)
  if entry['latest_commit']
    json.partial! 'last_commit', entry: entry
  end
end

if @project.educoder?
  file_path = params[:filepath].present? ? [params[:filepath], entry['name']].join('/') : entry['name']

  json.name entry['name']
  json.sha nil
  json.path file_path
  json.type entry['type'] === 'blob'? 'file' : 'dir'
  json.size 0
  json.content nil
  json.target nil
  json.download_url nil
  json.direct_download false
  json.image_type false
  json.is_readme_file false
  if entry['latest_commit']
    # json.partial! 'last_commit', entry: entry
    json.partial! 'repositories/simple_entry', locals: { entry: entry }
  end
end
