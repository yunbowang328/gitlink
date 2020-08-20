json.total_count @total_count
json.builds @builds do |build|
  json.partial! "/ci/builds/build", build: build
end
