json.pipelines @pipelines do |pipeline|
  json.partial! "/ci/pipelines/list", pipeline: pipeline
end