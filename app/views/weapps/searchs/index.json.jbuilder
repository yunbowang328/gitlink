json.count @results.total_count
json.results do
  json.array! @results.with_highlights(multiple: true) do |obj, highlights|
    json.merge! obj.to_searchable_json
    json.type obj.class.name.downcase

    json.title highlights.delete(:name)&.join('...') || obj.searchable_title
    json.cover url_to_avatar(obj)

    if obj.is_a?(Course)
      json.author_avatar_url url_to_avatar(obj.teacher)
    end
  end
end