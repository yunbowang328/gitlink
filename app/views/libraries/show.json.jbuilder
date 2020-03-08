library = current_library

json.extract! library, :id, :uuid, :title, :content, :author_name, :author_school_name, :status, :visited_count

json.praise_count library.praises_count

json.published_at library.display_published_at
json.created_at library.display_created_at

# 创建者
json.creator do
  json.partial! 'users/user_simple', user: library.user
  json.school_name library.user.school_name
end

# 封面
if library.cover_id.present?
  json.cover do
    json.partial! 'attachments/attachment_simple', attachment: library.cover
  end
else
  json.cover nil
end

json.attachments library.attachments, partial: 'attachments/attachment_small', as: :attachment

# 标签
json.tags do
  json.array! library.library_tags.each do |tag|
    json.extract! tag, :id, :name
  end
end

# 操作权限
json.operation do
  if current_user&.logged?
    manageable = library_manageable?(library)

    json.can_deletable manageable
    json.can_editable manageable
    json.user_praised library.praise_treads.exists?(user_id: current_user&.id)
  else
    json.can_deletable false
    json.can_editable false
    json.user_praised false
  end
end
