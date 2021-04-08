json.steps @pipeline_stage_steps do |pipeline_stage_step|
  json.partial! "/ci/pipeline_stage_steps/list", pipeline_stage_step: pipeline_stage_step, stage_type: @stage_type
end