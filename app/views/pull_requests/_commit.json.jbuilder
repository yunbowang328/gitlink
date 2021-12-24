if commit['Status'].present?
  json.author do
    json.partial! 'repositories/commit_author', locals: { user: render_cache_commit_author(commit['Author']), name: commit['Author']['Name'] }
  end
  
  json.committer do
    json.partial! 'repositories/commit_author', locals: { user: render_cache_commit_author(commit['Committer']), name: commit['Committer']['Name'] }
  end
  json.timestamp render_unix_time(commit['Committer']['When'])
  json.time_from_now time_from_now(commit['Committer']['When'])
  json.created_at render_format_time_with_date(commit['Committer']['When'])
  json.message commit['CommitMessage']
  json.sha commit['Sha']
else
  json.author do
    json.partial! 'repositories/commit_author', locals: { user: render_cache_commit_author(commit['commit']['author']), name: commit['commit']['author']['name'] }
  end

  json.committer do
    json.partial! 'repositories/commit_author', locals: { user: render_cache_commit_author(commit['commit']['committer']), name: commit['commit']['committer']['name'] }
  end
  json.timestamp render_unix_time(commit['commit']['committer']['date'])
  json.time_from_now time_from_now(commit['commit']['committer']['date'])
  json.created_at render_format_time_with_date(commit['commit']['committer']['date'])
  json.message commit['commit']['message']
  json.sha commit['sha']
end