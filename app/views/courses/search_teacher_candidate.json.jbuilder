json.candidates do
  json.array! @users do |user|
    json.id user.id
    json.name user.real_name
    json.nickname user.nickname
    json.login user.login
    json.school_name user.user_extension.school.try(:name)
    json.school_id user.user_extension.school.try(:id)
    json.added @course.course_member?(user.id, [1, 2, 3])
    json.image_url url_to_avatar(user)
    json.phone user.hidden_phone
  end
end
json.candidates_count @users_size