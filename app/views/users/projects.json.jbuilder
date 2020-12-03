json.count @total_count
json.projects do
  json.partial! '/projects/project_detail', collection: @projects, as: :project
end
