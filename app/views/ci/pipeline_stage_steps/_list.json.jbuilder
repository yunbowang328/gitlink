json.id pipeline_stage_step.id
json.step_name pipeline_stage_step.step_name
json.stage_id pipeline_stage_step.stage_id
json.show_index pipeline_stage_step.show_index
json.content pipeline_stage_step.content
json.created_at pipeline_stage_step.created_at
json.updated_at pipeline_stage_step.updated_at
json.template do
  json.partial! "/ci/templates/list", template: Ci::Template.find(pipeline_stage_step.template_id)
end

