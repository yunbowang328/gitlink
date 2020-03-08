json.count @count
json.videos @videos, partial: 'users/videos/video', as: :video
json.course_id @course.id