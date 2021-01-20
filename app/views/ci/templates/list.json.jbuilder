json.templates @templates do |template|
  json.partial! "/ci/templates/list", template: template
end