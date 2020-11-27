json.extract! @version, :id, :name, :body, :tag_name, :target_commitish, :draft, :prerelease,:version_gid

json.attachments do
  json.array! @version_attachments do |attachment|
    json.partial! "attachments/attachment_simple", locals: {attachment: attachment}
  end
end