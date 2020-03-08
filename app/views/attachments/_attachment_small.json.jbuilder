json.id attachment.id
json.title attachment.title
json.filesize number_to_human_size(attachment.filesize)
json.is_pdf attachment.is_pdf?
json.url attachment.is_pdf? ? download_url(attachment,disposition:"inline") : download_url(attachment)
json.created_on attachment.created_on
json.content_type attachment.content_type
