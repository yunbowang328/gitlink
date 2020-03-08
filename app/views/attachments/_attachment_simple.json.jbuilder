json.id attachment.id
json.title attachment.title
json.filesize  number_to_human_size attachment.filesize
json.description attachment.description
json.is_pdf attachment.is_pdf?
json.url attachment.is_pdf? ? download_url(attachment,disposition:"inline") : download_url(attachment)
# json.url download_url(attachment)
json.set! :delete, delete.nil? ? true : delete if defined? delete