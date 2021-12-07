json.total_count @people.total_count
json.people do 
  json.array! @people.each do |p|
    json.(p, :id, :name, :announcement, :content, :fake_login)
    json.image_url p.image
    json.created_time format_time(p.created_at)
  end
end