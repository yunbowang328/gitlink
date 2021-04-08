json.id pipeline.id
json.pipeline_name pipeline.pipeline_name
json.pipeline_status pipeline.pipeline_status == 'unknown' ? '' : pipeline.pipeline_status
json.file_name pipeline.file_name
json.sync pipeline.sync
json.branch pipeline.branch
json.event pipeline.event
json.sha pipeline.sha
json.identifier pipeline.identifier
json.last_build_time pipeline.last_build_time.nil? ? '' : pipeline.last_build_time.strftime("%Y-%m-%d %H:%M:%S")
json.created_at pipeline.created_at.strftime("%Y-%m-%d %H:%M:%S")
json.updated_at pipeline.updated_at.strftime("%Y-%m-%d %H:%M:%S")
