if latest_commit.blank?
  json.nil!
else
  json.message latest_commit['message']
  json.sha latest_commit['sha']
  json.created_at render_format_time_with_unix(latest_commit['created_at'].to_i)
  json.time_from_now time_from_now(render_format_time_with_unix(latest_commit['created_at'].to_i))
  json.created_at_unix latest_commit['created_at']
end
