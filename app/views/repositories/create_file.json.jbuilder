json.name @file['content']['name']
json.sha @file['content']['sha']
json.size @file['content']['size']
json.content @file['content']['content']
json.encoding @file['content']['encoding']
json.pr_id @pull_issue.try(:id)
json.commit do
  json.message @file['commit']['message']
  json.author @file['commit']['author']
  json.committer @file['commit']['committer']
end
