json.id step.step_id
json.number step.step_number
json.name step.step_name
json.status step.step_status
json.exit_code step.step_exit_code
json.started format_utc_time(step.step_started)
json.stopped format_utc_time(step.step_stopped)
json.version step.build_version
