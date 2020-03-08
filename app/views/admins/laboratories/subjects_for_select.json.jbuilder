json.count @count
json.subjects do
  json.array! @subjects do |subject|
    json.extract! subject, :id, :name, :status
    json.status_text I18n.t("subject.status.#{subject.status}")
    json.creator_name subject.user.real_name
  end
end