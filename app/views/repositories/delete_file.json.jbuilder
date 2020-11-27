json.commit do
  json.sha @file['commit']['sha']
  json.message @file['commit']['message']
  json.author @file['commit']['author']
  json.committer @file['commit']['committer']
end
