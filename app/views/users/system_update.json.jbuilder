if @notice && @notice.end_time > Time.now
  json.system_update true
  json.system_score @notice.notes.rstrip
  json.(@notice, :subject, :start_time, :end_time)
else
  json.system_update false
end