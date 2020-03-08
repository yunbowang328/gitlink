json.count @count
json.videos do
  json.array! @videos.each do |video|
    json.partial! 'video', video: video
    json.file_url nil
  end
end