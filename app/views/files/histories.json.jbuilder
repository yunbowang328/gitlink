
json.partial! 'attachments/attachment_small', attachment: @file
json.partial! "attachment_histories/list", attachment_histories: @attachment_histories
