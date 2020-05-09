json.project_ids @projects.pluck(:id)
json.total_count @total_count
json.projects do
  json.partial! "/projects/project_item", collection: @projects, as: :porject
end
