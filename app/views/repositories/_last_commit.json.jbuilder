created_at = Time.at(entry['latest_commit']['created_at'].to_i).strftime("%Y-%m-%d %H:%M")
json.commit do
  json.message entry['latest_commit']['message']
  json.sha entry['latest_commit']['sha']
  json.created_at created_at
  json.time_from_now time_from_now(created_at)
  json.created_at_unix entry['latest_commit']['created_at']
end
