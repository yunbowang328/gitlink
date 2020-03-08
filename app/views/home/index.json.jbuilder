json.images_url @images_url

json.reps @rep_list

json.shixuns do
  json.partial! 'shixuns/shixun', locals: {shixuns: @shixuns}
end

json.subjects do
  json.partial! 'subjects/subject', locals: {subjects: @subjects}
end

# if current_laboratory.main_site?
#   json.teachers do
#     json.partial! 'users/user_small', users: @tea_users
#   end
#
#   json.students do
#     json.partial! 'users/user_small', users: @stu_users
#   end
# end
