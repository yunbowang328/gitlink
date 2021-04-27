json.total_count @applied_transfer_projects.total_count
json.applied_transfer_projects @applied_transfer_projects do |apply|
  json.partial! "/projects/applied_transfer_projects/detail", locals: {object: apply}
end
