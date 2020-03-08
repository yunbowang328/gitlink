json.tasks @tasks.each do |task|
  json.user_name task.user.real_name
  json.task_id task.id
  json.task_name task.name
  json.category task.course_second_category&.name
  json.position task.position
end