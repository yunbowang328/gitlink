json.total_count @people.total_count
json.people do 
  json.array! @people.each do |p|
    json.(p, :id, :name, :image_url, :announcement, :content)
    json.created_time format_time(p.created_at)
  end
end