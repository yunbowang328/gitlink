json.total_count @communicates.total_count 
json.communicates do 
  json.array! @communicates.each do |communicate|
    json.(communicate, :id, :title, :content, :fake_id)
    json.tag communicate.tag_field.include?(',') ? communicate.tag_field.split(",") : communicate.tag_field
    json.created_time format_time(communicate.created_at)
  end
end