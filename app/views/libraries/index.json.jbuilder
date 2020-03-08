json.count @count
json.libraries do
  json.array! @libraries.each do |library|
    json.extract! library, :id, :title, :content, :author_name, :author_school_name, :status, :visited_count

    json.cover_url library.cover_id.present? ? download_url(library.cover) : nil

    json.praise_count library.praises_count
    json.download_count @download_count_map.fetch(library.id, 0)

    json.published_at library.display_published_at
    json.created_at library.display_created_at

    # 标签
    json.tags do
      json.array! library.library_tags.each do |tag|
        json.extract! tag, :id, :name
      end
    end
  end
end