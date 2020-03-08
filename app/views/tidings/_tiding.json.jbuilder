json.extract! tiding, :id, :status, :viewed, :user_id, :tiding_type, :container_id, :container_type,
              :parent_container_id, :parent_container_type, :belong_container_id, :belong_container_type, :extra
json.content tiding.content

json.identifier tiding.identifier
json.auth_type tiding.container_type == 'ApplyUserAuthentication' ? tiding.container.auth_type : nil

homework_type = nil
if tiding.container_type == 'HomeworkCommon'
  homework_type = tiding.container.homework_type rescue nil
end
if homework_type.blank? && tiding.parent_container_type == 'HomeworkCommon'
  homework_type = tiding.parent_container.homework_type rescue nil
end
json.homework_type homework_type

json.time tiding.how_long_time
json.new_tiding tiding.unread?(@onclick_time)

# 需要系统头像
show_system_user = tiding.trigger_user_id.zero? || tiding.tiding_type == 'System' || tiding.anonymous?

json.trigger_user do
  if show_system_user
    json.id 0
    json.name "系统"
    json.login ""
    json.image_url "educoder/systemLogo.png"
  else
    json.partial! 'users/user_simple', user: tiding.trigger_user
  end
end

json.attachments tiding.attachments, partial: 'attachments/attachment_small', as: :attachment
