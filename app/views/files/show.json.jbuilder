json.partial! 'attachments/attachment', attachment: @file
json.partial! "files/course_groups", attachment_group_settings: @file.attachment_group_settings
json.partial! "attachment_histories/list", attachment_histories: @attachment_histories