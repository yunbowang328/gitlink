json.stages @stages do |stage|
  json.partial! 'stages/stage', locals: {stage: stage, user: @user, subject: @subject, myshixuns: @myshixuns}
end

# json.description @subject&.description

json.start_learning @start_learning
json.subject_id @subject.id

json.learned @start_learning ? @course.my_subject_progress(@myshixuns) : 0

json.last_shixun @start_learning ? last_subject_shixun(@course, @myshixuns) : ""