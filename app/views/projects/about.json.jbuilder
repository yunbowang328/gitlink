json.content @project_detail&.content
json.identifier @project.identifier
json.attachments @attachments do |attach|
  json.partial! "attachments/attachment_simple", locals: {attachment: attach}
end
