json.id pipeline.id
json.pipeline_name pipeline.pipeline_name
json.pipeline_status pipeline.pipeline_status
json.file_name pipeline.file_name
json.created_at pipeline.created_at
json.updated_at pipeline.updated_at
json.stages pipeline.pipeline_stages do |pipeline_stage|
  json.partial! "/ci/pipeline_stages/list", pipeline_stage: pipeline_stage
end
