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
  json.zip_url render_zip_url(@project, @ref)
  json.tar_url render_tar_url(@project, @ref)
  json.entries do
    json.array! @entries do |entry|
      json.name entry['name']
      json.path entry['path']
      json.sha entry['sha']
      json.type entry['type']
      json.size entry['size']
      content =
        if is_readme_type?(entry['name'])
          is_readme_file = true
          content = Gitea::Repository::Entries::GetService.call(@owner, @project.identifier, entry['name'], ref: @ref)['content']
          readme_render_decode64_content(content, @path)
        else
          is_readme_file = false
          entry['content']
        end
      json.is_readme_file is_readme_file
      json.content content
      json.target entry['target']
      if entry['latest_commit']
        json.partial! 'last_commit', entry: entry
      end
    end
  end
end
