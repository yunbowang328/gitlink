json.author do
  author = User.find_by(login: commit['Author']['Name'])
  json.partial! 'repositories/commit_author', locals: { user: author }
end

json.committer do
  author = User.find_by(login: commit['Committer']['Name'])
  json.partial! 'repositories/commit_author', locals: { user: author }
end
json.timestamp render_unix_time(commit['Committer']['When'])
json.time_from_now time_from_now(commit['Committer']['When'])
json.created_at render_format_time_with_date(commit['Committer']['When'])
json.message commit['CommitMessage']
json.sha commit['Sha']
