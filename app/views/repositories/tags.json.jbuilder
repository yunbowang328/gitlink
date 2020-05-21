json.array! @tags do |tag|
  if tag.present? 
    json.name tag['name']
    json.id tag['id']
    json.zipball_url tag['zipball_url']
    json.tarball_url tag['tarball_url']
    json.commit do
      json.sha tag['commit']['sha']
    end
  end
end
