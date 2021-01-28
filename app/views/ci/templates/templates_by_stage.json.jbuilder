json.array! @category_templates do |category, templates|
  json.partial! "/ci/templates/templates_by_stage", category: category, templates: templates
end