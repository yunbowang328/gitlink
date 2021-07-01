json.array! @tags do |tag|
  if tag.present? 
    json.name tag['name']
    json.id tag['id']
    json.zipball_url render_zip_url(@owner, @repository, tag['name'])
    json.tarball_url render_tar_url(@owner, @repository, tag['name'])
    json.commit do
      json.sha tag['commit']['sha']
    end
  end
end

