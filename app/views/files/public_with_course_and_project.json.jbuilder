json.partial! "commons/success"
json.data do
  json.total_count @total_count
  json.files do
    json.array! @attachments do |attachment|
      json.partial! "attachments/attachment_small", attachment: attachment
      json.author do
        json.partial! "users/user_simple", user: attachment.author
      end
    end
  end
end