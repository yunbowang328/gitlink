json.course_groups do
  json.array! attachment_group_settings, partial: 'course_groups/course_group', as: :attachment_group_setting
end