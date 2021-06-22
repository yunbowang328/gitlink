if @project.educoder?
  json.last_commit do
    if @entries['commits']
      json.partial! 'commit', commit: @entries['commits'], project: @project
    else
      json.nil!
    end
  end
  json.commits_count @entries['commit_count']
  json.zip_url @entries['git_url']
  json.tar_url ''
  json.entries do
    json.array! @entries['trees'] do |entry|
      json.name entry['name']
      json.path entry['name']
      json.sha nil
      json.type entry['type'] === 'blob'? 'file' : 'dir'
      json.size 0
      json.is_readme_file false
      json.content nil
      json.target nil
      json.commit do
        json.message entry['title']
        json.time_from_now entry['time']
        json.sha nil
        json.created_at_unix nil
        json.created_at nil
      end
    end
  end
end


if @project.forge?
  json.last_commit do
    if @latest_commit
      json.partial! 'commit', commit: @latest_commit, project: @project
    else
      json.nil!
    end
  end
  #json.tags_count @tags_count
  #json.branches_count @branches_count
  #json.commits_count @commits_count
  json.zip_url render_zip_url(@owner, @repository, @ref)
  json.tar_url render_tar_url(@owner, @repository, @ref)
  json.entries do
    json.array! @entries do |entry|
      json.name entry['name']
      json.path entry['path']
      json.sha entry['sha']
      json.type entry['type']
      json.size entry['size']
      json.is_readme_file is_readme?(entry['type'], entry['name'])
      json.content decode64_content(entry, @owner, @repository, @ref, @path)
      json.target entry['target']
      json.commit do
        json.partial! 'last_commit', latest_commit: entry['latest_commit']
      end
    end
  end
end
