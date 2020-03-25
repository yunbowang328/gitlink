json.name @file['content']['name']
json.sha @file['content']['sha']
json.size @file['content']['size']
json.content @file['content']['content']
json.encoding @file['content']['encoding']
json.commit do
  json.message @file['commit']['message']
  json.author @file['commit']['author']
  json.committer @file['commit']['committer']
end
