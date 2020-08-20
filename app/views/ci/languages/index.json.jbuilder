json.array! @languages do |lang|
  json.id lang.id
  json.name lang.name
  json.content render_base64_decoded lang.content
  json.cover_url lang.cover_id.present? ? download_url(lang.cover) : nil
end
