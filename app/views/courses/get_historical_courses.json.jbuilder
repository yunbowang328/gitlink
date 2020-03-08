json.courses do
  json.array! @courses do |course|
    if course.course_groups.present?
      course.course_groups.each do |course_group|
        json.name course.name + "-" + course_group.name
        json.course_id course.id
        json.course_group_id course_group.id
      end
    else
      json.name course.name
      json.course_id course.id
    end
  end
end