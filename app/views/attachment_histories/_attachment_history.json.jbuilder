json.id attachment.id
json.title attachment.title
json.is_public attachment.publiced?
json.is_publish attachment.published?
json.publish_time attachment.publish_time
json.quotes attachment.quotes_count
json.downloads_count attachment.downloads_count
json.created_on attachment.created_on
# json.url attachment_path(attachment, type: 'history').gsub("/api","")
json.is_pdf attachment.is_history_pdf?
json.url attachment.is_history_pdf? ? attachment_path(attachment, type: 'history',disposition:"inline") : attachment_path(attachment, type: 'history')
json.attachment_id attachment.attachment_id
json.content_type attachment.content_type
