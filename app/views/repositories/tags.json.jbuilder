json.array! @tags do |tag|
  if tag.present? 
    json.name tag['name']
    json.id tag['id']
    json.zipball_url render_zip_url(@owner, @repository, tag['name'])
    json.tarball_url render_tar_url(@owner, @repository, tag['name'])
    json.commit do
      json.sha tag['commit']['sha']
      json.message tag['commit_message']
      json.time_ago time_from_now(tag['commit_time'].to_time)
      json.committer do 
        json.partial! 'commit_author', user: render_commit_author(tag['commiter']), name: tag['commiter']['name']
      end
    end
  end
end

