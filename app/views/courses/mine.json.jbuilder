json.partial! "commons/success"
json.data @courses do |course|
  json.(course, :id, :name, :updated_at, :end_date)
  json.created_at course.created_at.strftime("%Y-%m-%d")
end

