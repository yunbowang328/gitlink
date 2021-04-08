json.stages @pipeline_stages do |pipeline_stage|
  json.partial! "/ci/pipeline_stages/list", pipeline_stage: pipeline_stage, pipeline_name: @pipeline_name
end