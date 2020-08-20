json.partial! "/ci/builds/build", build: @build
json.stages @build.stages do |stage|
  json.partial! "/ci/builds/stage", stage: stage
end
