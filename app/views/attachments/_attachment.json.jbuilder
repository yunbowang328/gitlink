json.id attachment.id
json.title attachment.title
json.is_public attachment.publiced?
# json.is_lock attachment.locked?(@is_member)
json.is_lock !attachment.publiced?
json.is_publish attachment.published?
json.delay_publish attachment.delay_publish
json.publish_time attachment.publish_time
json.unified_setting attachment.unified_setting
json.filesize number_to_human_size(attachment.filesize)
# json.quotes attachment.quotes_count
json.description attachment.description
json.downloads_count attachment.downloads_count
json.created_on attachment.created_on
json.content_type attachment.content_type
json.is_pdf attachment.is_pdf?
json.url attachment.is_pdf? ? download_url(attachment,disposition:"inline") : download_url(attachment)
json.play_url attachment_show_users_path(file_name: local_path(attachment))
