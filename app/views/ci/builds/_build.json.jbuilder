json.id build.build_id
json.repo_id build.build_repo_id
json.number build.build_number
json.status build.build_status
json.event build.build_event
json.action build.build_action
# json.link build.build_link
json.message build.build_message
json.author build.build_author
json.started format_utc_time build.build_started
json.finished format_utc_time build.build_finished
json.created format_utc_time build.build_created
json.updated format_utc_time build.build_updated
json.version build.build_version
json.duration_time render_duartion_time(build.build_finished, build.build_started)
