file_name = entry['name']
file_type = file_name.to_s.split(".").last
direct_download = download_type(file_type)
image_type = image_type?(file_type)
json.name file_name
json.sha entry['sha']
json.path entry['path']
json.type entry['type']
json.size entry['size']
json.content entry['content'].present? && ( !direct_download && !image_type ) ? render_decode64_content(entry['content']).force_encoding('UTF-8') : ""
json.target entry['target']
json.download_url entry['download_url']
json.direct_download direct_download
json.image_type image_type

if entry['latest_commit']
  json.partial! 'last_commit', entry: entry
end
