if @project.educoder?
  json.commit do
    json.sha commit[0]['id']
    json.message commit[0]['title']
    json.author {}
    json.committer {}
    json.timestamp 0
    json.time_from_now commit[0]['time']
  end
  json.author do
    {}
    # json.partial! '/projects/author', user: render_commit_author(commit['author'])
  end
  json.committer {}
end

if @project.forge?
  json.commit do
    json.sha commit['sha']
    # json.url EduSetting.get('host_name') + commit_repository_path(project.repository, commit['sha'])
    json.message commit['commit']['message']
    json.author commit['commit']['author']
    json.committer commit['commit']['committer']
    json.timestamp render_unix_time(commit['commit']['committer']['date'])
    json.time_from_now time_from_now(commit['commit']['committer']['date'])
  end

  json.author do
    json.partial! 'commit_author', user: render_cache_commit_author(commit['commit']['author']), name: commit['commit']['author']['name']
  end
  json.committer do
    json.partial! 'commit_author', user: render_cache_commit_author(commit['commit']['committer']), name: commit['commit']['committer']['name']
  end
end
