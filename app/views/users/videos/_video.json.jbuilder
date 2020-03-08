json.extract! video, :id, :title, :cover_url, :file_url, :play_url, :vv, :user_id

json.play_duration video.video_play_duration
json.published_at video.display_published_at
json.created_at video.display_created_at
json.updated_at video.display_updated_at