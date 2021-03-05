json.array! @secrets do |secret|
  json.partial! "/ci/secrets/index", secret: secret
end