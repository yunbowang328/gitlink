json.id journal.id
json.user_name journal.user.try(:show_real_name)
json.user_login journal.user.try(:login)
json.user_picture url_to_avatar(journal.user)
json.is_journal_detail journal.is_journal_detail?  #判断是否修改了参数而添加的回复内容
json.content journal.try(:notes)
json.children_journals children_content(journal.id)
json.journal_details journal.journal_content
json.format_time format_time(journal.created_on)
json.created_at time_from_now(journal.created_on)

json.attachments do
  json.array! journal.attachments do |attachment|
    json.partial! "attachments/attachment_simple", locals: {attachment: attachment}
  end
end