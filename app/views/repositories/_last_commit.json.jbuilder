json.commit do
  json.message entry['latest_commit']['message']
  json.sha entry['latest_commit']['sha']
  json.created_at render_format_time_with_unix(entry['latest_commit']['created_at'].to_i)
  json.time_from_now time_from_now(render_format_time_with_unix(entry['latest_commit']['created_at'].to_i))
  json.created_at_unix entry['latest_commit']['created_at']
end
