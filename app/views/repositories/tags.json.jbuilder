json.array! @tags do |tag|
  if tag.present? 
    json.name tag['name']
    json.id tag['id']
    json.zipball_url render_zip_url(@owner, @repository, tag['name'])
    json.tarball_url render_tar_url(@owner, @repository, tag['name'])
    json.tagger do 
      json.partial! 'commit_author', user: render_commit_author(tag['tagger']), name: tag['tagger']['name']
    end
    json.message tag['message']
    json.commit do
      json.sha tag['commit']['sha']
      json.message tag['commit']['message']
      json.time_ago time_from_now(tag['commit']['commiter']['date'].to_time)
      json.committer do 
        json.partial! 'commit_author', user: render_commit_author(tag['commit']['commiter']), name: tag['commit']['commiter']['name']
      end
      json.author do 
        json.partial! 'commit_author', user: render_commit_author(tag['commit']['author']), name: tag['commit']['author']['name']
      end
    end
  end
end

