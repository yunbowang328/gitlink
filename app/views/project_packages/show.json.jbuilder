package = current_package

json.extract! package, :id, :title, :content, :category_name, :status,
              :visit_count, :bidding_users_count, :min_price, :max_price

json.category_id package.project_package_category_id

# 只有自己和管理员才返回私人信息
if package_manageable?
  json.contact_name package.contact_name
  json.contact_phone package.contact_phone
end

json.updated_at package.display_updated_at
json.deadline_at package.display_deadline_at
json.published_at package.display_published_at

json.creator do
  json.partial! 'users/user_simple', user: package.creator
end

json.attachments do
  json.array! package.attachments, partial: 'attachments/attachment_simple', as: :attachment
end

json.bidding_users do
  json.array! package.bidding_users.includes(:user).each do |bidding_user|
    json.partial! 'users/user_simple', user: bidding_user.user

    json.status bidding_user.status
  end
end

json.operation do
  if current_user
    manageable = package_manageable?

    json.can_bidding package.can_bidding?(current_user)
    json.can_select_bidding_user package.bidding_end? && package.bidding_ended? && manageable
    json.can_edit package.editable? && manageable
    json.can_delete package.deletable? && manageable
  end
end