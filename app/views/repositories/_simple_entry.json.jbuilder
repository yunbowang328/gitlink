if @project.forge?
  file_name = entry['name']
  file_type = File.extname(file_name.to_s)[1..-1]
  direct_download = download_type(file_type)
  image_type = image_type?(file_type)
  json.name file_name
  json.sha entry['sha']
  json.path entry['path']
  json.type entry['type']
  json.size entry['size']

  json.content decode64_content(entry, @owner, @repository, @ref, @path)
  json.target entry['target']
  
  download_url = 
    if image_type
      dir_path = [@owner.login, @repository.identifier, "raw/branch", @ref].join('/')
      render_download_image_url(dir_path, entry['path'], decode64_content(entry, @owner, @repository, @ref))
    else
      # entry['download_url']
      render_download_file_url(@owner, @repository, entry['path'].to_s, @ref)
    end
  json.download_url download_url

  json.direct_download direct_download
  json.image_type image_type
  json.is_readme_file is_readme?(entry['type'], entry['name'])
  json.commit do
    json.partial! 'last_commit', latest_commit: entry['latest_commit']
  end
end

if @project.educoder?
  file_path = params[:filepath].present? ? [params[:filepath], entry['name']].join('/') : entry['name']

  json.name entry['name']
  json.sha nil
  json.path file_path
  json.type entry['type'] === 'blob'? 'file' : 'dir'
  json.size 0
  json.content entry['content']
  json.target nil
  json.download_url nil
  json.direct_download false
  json.image_type false
  json.is_readme_file false
  json.commit do
    json.message entry['title']
    json.time_from_now entry['time']
    json.sha nil
    json.created_at_unix nil
    json.created_at nil
  end
end
