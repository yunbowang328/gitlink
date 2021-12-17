json.competitions do
  json.array! @competitions.each do |competition|
    json.(competition, :id, :title, :content)
    json.start_time format_time(competition.start_time)
    json.end_time format_time(competition.end_time)
  end
end