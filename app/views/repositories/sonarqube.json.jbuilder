json.array! @sonarqubes do |sonarqube|
  json.branch_name sonarqube.branch_name
  json.bug_num sonarqube.bug_num
  json.loophole sonarqube.loophole
  json.repetition_rate number_to_percentage(sonarqube.repetition_rate, precision: 1)
  json.file_num sonarqube.file_num
  json.created_at format_time(sonarqube.created_at)
  json.updated_at format_time(sonarqube.updated_at)
end