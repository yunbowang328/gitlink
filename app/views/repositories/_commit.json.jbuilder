json.commit do
  json.sha commit['sha']
  json.url EduSetting.get('host_name') + commit_repository_path(project.repository, commit['sha'])
  json.message commit['commit']['message']
  json.author commit['commit']['author']
  json.committer commit['commit']['committer']
  json.timestamp render_unix_time(commit['commit']['committer']['date'])
  json.time_from_now time_from_now(commit['commit']['committer']['date'])
end

json.author do
  json.partial! 'commit_author', user: render_commit_author(commit['author'])
end
json.committer do
  json.partial! 'commit_author', user: render_commit_author(commit['committer'])
end
