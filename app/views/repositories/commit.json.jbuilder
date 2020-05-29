json.key_format! camelize: :lower
json.additions @commit['commit_diff']['TotalAddition']
json.deletions @commit['commit_diff']['TotalDeletion']
json.sha @commit['sha']
json.url request.url
json.commit do
  @commit['commit'].delete('url')
  json.author @commit['commit']['author']
  json.committer @commit['commit']['committer']
  json.tree do
    @commit['commit']['tree']['sha']
  end
end
json.author do
  json.partial! 'commit_author', user: render_commit_author(@commit['author'])
end
json.committer do
  json.partial! 'commit_author', user: render_commit_author(@commit['committer'])
end

json.parents @commit['parents'] do |parent|
  json.sha parent['sha']
  json.url EduSetting.get('host_name') + commit_repository_path(@repo, parent['sha'])
end

json.files @commit['commit_diff']['Files']
