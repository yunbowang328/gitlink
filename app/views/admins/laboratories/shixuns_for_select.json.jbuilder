json.count @count
json.shixuns do
  json.array! @shixuns do |shixun|
    json.extract! shixun, :id, :name, :status
    json.status_text I18n.t("shixun.status.#{shixun.status}")
    json.creator_name shixun.user.real_name
  end
end