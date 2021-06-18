json.total_count @applied_projects.total_count
json.applied_projects @applied_projects do |apply|
  json.partial! "/applied_projects/detail", locals: {object: apply}
end
