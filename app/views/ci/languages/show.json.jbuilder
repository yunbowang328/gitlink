json.id @language.id
json.name @language.name
json.content render_base64_decoded @language.content
json.cover_url @language.cover_id.present? ? download_url(@language.cover) : nil
