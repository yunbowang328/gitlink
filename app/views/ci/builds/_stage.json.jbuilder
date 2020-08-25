json.id stage.stage_id
json.repo_id stage.stage_repo_id
json.build_id stage.stage_build_id
json.name stage.stage_name
json.kind stage.stage_kind
json.type stage.stage_type
json.number stage.stage_number
json.status stage.stage_status
json.errignore stage.stage_errignore
json.exit_code stage.stage_exit_code
json.os stage.stage_os
json.arch stage.stage_arch
json.started format_utc_time(stage.stage_started)
json.stopped format_utc_time(stage.stage_stopped)
json.created format_utc_time(stage.stage_created)
json.updated format_utc_time(stage.stage_updated)
json.duration_time render_duartion_time(stage.stage_started, stage.stage_stopped)
json.version stage.stage_version
json.on_success stage.stage_on_success
json.on_failure stage.stage_on_failure
json.steps stage.steps do |step|
  json.partial! "/ci/builds/step", step: step
end
